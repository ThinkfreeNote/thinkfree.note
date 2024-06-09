package com.thinkfreeNote.thinkfreeNote.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
// userId와 document_id의 조합이 유일하도록
@Table(name = "bookmark", uniqueConstraints = {@UniqueConstraint(columnNames = {"userId", "document_id"})})
public class BookMark {

    @Id
    @GeneratedValue
    private Long id;
    private String userId;

    @ManyToOne
    @JoinColumn(name = "document_id")
    private Document document;

    public BookMark(String userId, Document document) {
        this.userId = userId;
        this.document = document;
    }
}
