package com.thinkfreeNote.thinkfreeNote.dto;

import com.thinkfreeNote.thinkfreeNote.domain.Document;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DocumentDto {
    private Long id;
    private String title;
    private String content;

    public static DocumentDto toDto(Document document) {
        return new DocumentDto(document.getId(), document.getTitle(), document.getContent());
    }
}
