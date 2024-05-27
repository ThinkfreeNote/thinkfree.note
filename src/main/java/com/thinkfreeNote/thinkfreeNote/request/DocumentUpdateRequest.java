package com.thinkfreeNote.thinkfreeNote.request;

public record DocumentUpdateRequest(
        Long id,
        String title,
        String content
) {}
