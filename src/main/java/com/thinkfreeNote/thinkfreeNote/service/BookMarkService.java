package com.thinkfreeNote.thinkfreeNote.service;


import com.thinkfreeNote.thinkfreeNote.domain.BookMark;
import com.thinkfreeNote.thinkfreeNote.domain.Document;
import com.thinkfreeNote.thinkfreeNote.repository.BookMarkRepository;
import com.thinkfreeNote.thinkfreeNote.repository.DocumentRepository;
import com.thinkfreeNote.thinkfreeNote.response.BookMarkResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class BookMarkService {

    private final BookMarkRepository bookMarkRepository;
    private final DocumentRepository documentRepository;

    public boolean isBookMark(String userId, Long documentId) throws Exception {
        return bookMarkRepository.existsByUserIdAndDocumentId(userId,documentId);

    }

    public List<BookMarkResponse> getBookMarks(String userId) throws Exception {
        List<BookMark> bookMarks = bookMarkRepository.findByUserId(userId);

        // BookMark 는 document를 포함하고 있어서 Response에 맞게 변환
        return bookMarks.stream()
                .map(BookMarkResponse::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<Long> createBookMark(String userId, Long documentId) throws Exception {
        try {
            Document document = documentRepository.findById(documentId).orElseThrow(
                    () -> new Exception("Document not found")
            );

            BookMark bookMark = new BookMark(userId,document);
            return Optional.of(bookMarkRepository.save(bookMark).getId());
        }
        catch (DataIntegrityViolationException e) {
            throw new RuntimeException("이미 등록된 북마크");
        }
    }

    @Transactional
    public boolean deleteBookMark(String userId, Long documentId) throws Exception {
        if(!bookMarkRepository.existsByUserIdAndDocumentId(userId,documentId)) {
            return false;
        }

        bookMarkRepository.deleteByUserIdAndDocumentId(userId,documentId);

        return true;
    }
}
