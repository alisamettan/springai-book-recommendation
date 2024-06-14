package com.patika.book_recommendation.converter;

import com.patika.book_recommendation.dto.BookRequest;
import com.patika.book_recommendation.model.Book;
import com.patika.book_recommendation.model.User;

public class BookConverter {
    public static Book toBook(BookRequest request, User user) {
        Book book=Book.builder().
                name(request.getName()).
                description(request.getDescription()).
                user(user).
                build();

        return book;
    }
}
