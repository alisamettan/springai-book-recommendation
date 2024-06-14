package com.patika.book_recommendation.repository;

import com.patika.book_recommendation.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book,Long> {

    @Query("SELECT b FROM Book b WHERE b.user.id=:id")
    List<Book> findAllByUserId(Long id);
}
