package com.patika.book_recommendation.controller;

import com.patika.book_recommendation.model.User;
import com.patika.book_recommendation.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;


    @PostMapping("/signup")
    public User register(@RequestBody User user){
        return authenticationService.register(user.getName(),
                user.getEmail(),
                user.getPassword());
    }
    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return authenticationService.login(user.getEmail(), user.getPassword());
    }
}
