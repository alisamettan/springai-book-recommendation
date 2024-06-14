package com.patika.book_recommendation.controller;


import com.patika.book_recommendation.dto.ChatRequest;
import com.patika.book_recommendation.model.Book;


import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class ChatController {

    private final ChatClient chatClient;


    @CrossOrigin
    @PostMapping
    public Book generate(@RequestBody ChatRequest chatRequest) {

        String promptMessage = """
                Suggest me a new book similar to %s with an explanation why, this new book that you will suggest should be by this author %s and in this genre %s in Turkish description.
                Format:
                name: <book_name>
                description: <book_description>
                """;
        promptMessage = String.format(promptMessage, chatRequest.getFavBook(), chatRequest.getAuthor(), chatRequest.getGenre());

        PromptTemplate promptTemplate = new PromptTemplate(promptMessage, Map.of());
        Prompt prompt = promptTemplate.create();
        Generation generation = chatClient.call(prompt).getResult();

        // Dönen cevabı manuel olarak parse edelim
        String response = generation.getOutput().getContent();
        return parseResponse(response);
    }

    private Book parseResponse(String response) {
        Pattern namePattern = Pattern.compile("name: (.*)");
        Pattern descriptionPattern = Pattern.compile("description: (.*)");

        Matcher nameMatcher = namePattern.matcher(response);
        Matcher descriptionMatcher = descriptionPattern.matcher(response);

        Book book = new Book();
        if (nameMatcher.find()) {
            book.setName(nameMatcher.group(1).trim());
        }
        if (descriptionMatcher.find()) {
            book.setDescription(descriptionMatcher.group(1).trim());
        }

        return book;
    }
}