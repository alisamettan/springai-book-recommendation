package com.patika.book_recommendation.controller;


import com.patika.book_recommendation.dto.BookRequest;
import com.patika.book_recommendation.model.Book;


import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.ChatClient;
import org.springframework.ai.chat.Generation;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.parser.BeanOutputParser;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class ChatController {

    private final ChatClient chatClient;


    @CrossOrigin
    @PostMapping
    public Object generate(@RequestBody BookRequest bookRequest){


        String promptMessage = """
                Bana %s'a benzer, %s turunde %s isimli yazarin yazdigi bir kitabi aciklamasiyla oner.
                {format}""";
        promptMessage = String.format(promptMessage, bookRequest.getFavBook(), bookRequest.getGenre(), bookRequest.getAuthor());

        BeanOutputParser outputParser=new BeanOutputParser<>(Book.class);

        String format=outputParser.getFormat();


        PromptTemplate promptTemplate=new PromptTemplate(promptMessage,Map.of("format",format));
        Prompt prompt=promptTemplate.create();
        Generation generation=chatClient.call(prompt).getResult();
        return  outputParser.parse(generation.getOutput().getContent());

    }
}