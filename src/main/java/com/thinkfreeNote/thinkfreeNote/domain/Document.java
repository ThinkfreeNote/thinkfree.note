package com.thinkfreeNote.thinkfreeNote.domain;

import com.thinkfreeNote.thinkfreeNote.request.DocumentCreateRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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

    private String title;

    private String content;

    public Document(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public static Document toEntity(DocumentCreateRequest documentCreateRequest) {
        return new Document(documentCreateRequest.title(), documentCreateRequest.content());
    }
}
