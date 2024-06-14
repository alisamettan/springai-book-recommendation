package com.patika.book_recommendation.controller;


import com.patika.book_recommendation.dto.BookRequest;
import com.patika.book_recommendation.model.Book;
import com.patika.book_recommendation.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favBook")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;


    @PostMapping
    public Book save(@RequestBody BookRequest request , @RequestParam Long id ){
        return bookService.save(request,id);
    }

    @GetMapping("/{userId}")
    public List<Book> findAllByUserId(@PathVariable Long userId){
        return bookService.findAllByUserId(userId);
    }
}
