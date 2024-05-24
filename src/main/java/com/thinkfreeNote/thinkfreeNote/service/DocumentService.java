package com.thinkfreeNote.thinkfreeNote.service;

import com.thinkfreeNote.thinkfreeNote.domain.Document;
import com.thinkfreeNote.thinkfreeNote.request.DocumentCreateRequest;
import com.thinkfreeNote.thinkfreeNote.repository.DocumentRepository;
import com.thinkfreeNote.thinkfreeNote.response.DocumentCreateResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentCreateResponse createDocument(DocumentCreateRequest request) throws Exception {
        // 내용이 없으면 오류
        if (Strings.isBlank(request.title()) || Strings.isBlank(request.content())) {
            throw new Exception("문서 제목 또는 내용이 없습니다.");
        }

        // 엔티티로 변경
        Document document = Document.toEntity(request);

        // DB에 저장
        return DocumentCreateResponse.toResponse(documentRepository.save(document));
    }
}
