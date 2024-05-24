package com.thinkfreeNote.thinkfreeNote.response;

import com.thinkfreeNote.thinkfreeNote.domain.Document;

public record DocumentResponse(
        Long id,
        String title,
        String content
){
    public static DocumentResponse toResponse(Document document) {
        return new DocumentResponse(document.getId(), document.getTitle(), document.getContent());
    }
}
