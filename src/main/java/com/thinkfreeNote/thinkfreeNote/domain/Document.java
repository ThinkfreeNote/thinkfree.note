package com.thinkfreeNote.thinkfreeNote.domain;

import com.thinkfreeNote.thinkfreeNote.request.DocumentCreateRequest;
import com.thinkfreeNote.thinkfreeNote.request.DocumentUpdateRequest;
import io.micrometer.common.util.StringUtils;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Document {
    @Id
    @GeneratedValue
    private Long id;
    private String title;
    @Column(length = 100000)
    private String content;

    @OneToMany(mappedBy = "document", cascade = CascadeType.REMOVE)
    private List<BookMark> bookmarks;

    @ManyToOne()
    private Document document;

    public Document(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public static Document toEntity(DocumentCreateRequest documentCreateRequest) {
        return new Document(documentCreateRequest.title(), documentCreateRequest.content());
    }

    public void update(DocumentUpdateRequest request) {
        if(StringUtils.isNotBlank(request.title())) {
            this.title = request.title();
        }

        if(StringUtils.isNotBlank(request.content())) {
            this.content = request.content();
        }
    }
}
