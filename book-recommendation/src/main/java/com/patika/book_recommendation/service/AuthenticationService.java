package com.patika.book_recommendation.service;


import com.patika.book_recommendation.model.User;
import com.patika.book_recommendation.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User register(String fullName, String email, String password){
        Optional<User> existingUser=userRepository.findUserByEmail(email);
        if(existingUser.isPresent()){
            throw new RuntimeException("A user with this email already exists.: "+email);
        }

        String encodedPassword=passwordEncoder.encode(password);


        User user=new User();
        user.setName(fullName);
        user.setEmail(email);
        user.setPassword(encodedPassword);

        return userRepository.save(user);
    }

    public User login(String email, String password) {

        User user = userRepository.findUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
