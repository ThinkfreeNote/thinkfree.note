package com.thinkfreeNote.thinkfreeNote.response;

public record DocumentTitleResponse (
        Long id,
        String title
){
    public static DocumentTitleResponse toResponse(Long id, String title) {
        return new DocumentTitleResponse(id, title);
    }
}
