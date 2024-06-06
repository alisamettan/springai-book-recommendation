package com.patika.book_recommendation.controller;


import com.patika.book_recommendation.dto.BookRequest;
import com.patika.book_recommendation.service.PromptService;

import org.springframework.ai.chat.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/book")
public class ChatController {

    private final ChatClient chatClient;
    private final PromptService promptService;

    public ChatController(ChatClient chatClient, PromptService promptService) {
        this.chatClient = chatClient;
        this.promptService = promptService;
    }


    
    @CrossOrigin
    @PostMapping
    public String generate(@RequestBody BookRequest bookRequest){
        return chatClient.call(promptService.createPrompt(bookRequest));
        //return ".";

 }
}