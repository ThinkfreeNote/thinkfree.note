package com.thinkfreeNote.thinkfreeNote.response;

import com.thinkfreeNote.thinkfreeNote.domain.BookMark;

public record BookMarkResponse (
        Long id,
        String userId,
        Long documentId
) {
    public static BookMarkResponse toResponse(BookMark bookMark){
        return new BookMarkResponse(bookMark.getId(),bookMark.getUserId(),bookMark.getDocument().getId());
    }
}
