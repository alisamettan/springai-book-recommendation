package com.patika.book_recommendation.service;


import com.patika.book_recommendation.dto.BookRequest;
import org.springframework.stereotype.Service;

@Service
public class PromptService {

    public String createPrompt(BookRequest request){
        StringBuilder sb = new StringBuilder();
        sb.append("Bana ");
        if(!request.getFavBook().isBlank()){
            sb.append(request.getFavBook())
                    .append(" 'a benzer, ");
        }
        if(!request.getGenre().isBlank()){
            sb.append(request.getGenre())
                    .append(" turunde ");
        }
        if(!request.getAuthor().isBlank()){
            sb.append(request.getAuthor())
                    .append(" isimli yazarin yazdigi ");
        }

        sb.append("bir kitap oner.");

        return sb.toString();

    }

}
