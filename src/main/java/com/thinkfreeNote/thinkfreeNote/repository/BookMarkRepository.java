package com.thinkfreeNote.thinkfreeNote.repository;

import com.thinkfreeNote.thinkfreeNote.domain.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookMarkRepository extends JpaRepository<BookMark, Long> {
    boolean existsByUserIdAndDocumentId(String user_id, Long document_id);
    List<BookMark> findByUserId(String user_id);
    void deleteByUserIdAndDocumentId(String user_id, Long document_id);
}
