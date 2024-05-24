package com.thinkfreeNote.thinkfreeNote.domain;

import com.thinkfreeNote.thinkfreeNote.dto.DocumentDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Document {
    @Id
    @GeneratedValue
    private Long id;

    private String content;

    public Document(String content) {
        this.content = content;
    }

    public static Document toEntity(DocumentDto documentDto) {
        return new Document(documentDto.getContent());
    }
}
