package com.patika.book_recommendation.service;

import com.patika.book_recommendation.dto.BookRequest;
import com.patika.book_recommendation.model.Book;

import java.util.List;

public interface BookService {
    Book save(BookRequest request,Long userId);
    List<Book> findAllByUserId(Long userId);
}
