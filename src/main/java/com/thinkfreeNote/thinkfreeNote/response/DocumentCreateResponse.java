package com.thinkfreeNote.thinkfreeNote.response;

import com.thinkfreeNote.thinkfreeNote.domain.Document;

public record DocumentCreateResponse (

    Long id,
    String title,
    String content

) {
    public static DocumentCreateResponse toResponse(Document document) {
        return new DocumentCreateResponse(document.getId(), document.getTitle(), document.getContent());
    }
}
