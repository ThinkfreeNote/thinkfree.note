package com.thinkfreeNote.thinkfreeNote.service;

import com.thinkfreeNote.thinkfreeNote.domain.Document;
import com.thinkfreeNote.thinkfreeNote.repository.DocumentRepository;
import com.thinkfreeNote.thinkfreeNote.request.DocumentCreateRequest;
import com.thinkfreeNote.thinkfreeNote.request.DocumentUpdateRequest;
import com.thinkfreeNote.thinkfreeNote.response.DocumentResponse;
import com.thinkfreeNote.thinkfreeNote.response.DocumentTitleResponse;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository documentRepository;

    /**
     * 문서 생성
     * @param request
     * @return
     * @throws Exception
     */
    public Long createDocument(DocumentCreateRequest request) throws Exception {
        // 내용이 없으면 오류
        if (Strings.isBlank(request.content())) {
            throw new Exception("문서 내용이 없습니다.");
        }

        // 엔티티로 변경
        Document document = Document.toEntity(request);

        // DB에 저장
        return documentRepository.save(document).getId();
    }

    /**
     * 문서 조회
     * @param id
     * @return
     */
    public DocumentResponse getDocument(Long id) throws Exception {
        Document document = documentRepository.findById(id).orElseThrow(
                () -> new Exception("문서가 없습니다.")
        );

        return DocumentResponse.toResponse(document);
    }

    /**
     * 문서 제목 리스트 조회
     * @return
     */
    public List<DocumentTitleResponse> getTitleList() {
        return documentRepository.findAll().stream()
                .map(document -> DocumentTitleResponse.toResponse(document.getId(), document.getTitle()))
                .toList();
    }

    /**
     * 문서 업데이트
     * @param request
     * @return
     */
    public Long updateDocument(DocumentUpdateRequest request) throws Exception {
        Document document = documentRepository.findById(request.id()).orElseThrow(
                () -> new Exception("해당 문서가 없습니다.")
        );

        document.update(request);

        return documentRepository.save(document).getId();
    }
}
