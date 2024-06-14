package com.patika.book_recommendation.service;

import com.patika.book_recommendation.converter.BookConverter;
import com.patika.book_recommendation.dto.BookRequest;
import com.patika.book_recommendation.model.Book;
import com.patika.book_recommendation.model.User;
import com.patika.book_recommendation.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{

    private final BookRepository bookRepository;
    private final UserService userService;

    @Override
    public Book save(BookRequest request,Long userId) {
        User user=userService.findById(userId);
        Book book= BookConverter.toBook(request,user);
        user.getBooks().add(book);
        bookRepository.save(book);
        return book;
    }

    @Override
    public List<Book> findAllByUserId(Long userId) {
        return bookRepository.findAllByUserId(userId);
    }
}
