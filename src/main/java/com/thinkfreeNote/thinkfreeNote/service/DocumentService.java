package com.thinkfreeNote.thinkfreeNote.service;

import com.thinkfreeNote.thinkfreeNote.domain.Document;
import com.thinkfreeNote.thinkfreeNote.dto.DocumentDto;
import com.thinkfreeNote.thinkfreeNote.repository.DocumentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentDto createDocument(DocumentDto request) throws Exception {
        // 내용이 없으면 오류
        if (Strings.isBlank(request.getTitle()) || Strings.isBlank(request.getContent())) {
            throw new Exception("문서 제목 또는 내용이 없습니다.");
        }

        // 엔티티로 변경
        Document document = Document.toEntity(request);

        // DB에 저장
        return DocumentDto.toDto(documentRepository.save(document));
    }
}
