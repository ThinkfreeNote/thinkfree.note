package com.thinkfreeNote.thinkfreeNote.repository;

import com.thinkfreeNote.thinkfreeNote.domain.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
}
