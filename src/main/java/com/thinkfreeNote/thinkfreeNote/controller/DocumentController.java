package com.thinkfreeNote.thinkfreeNote.controller;

import com.thinkfreeNote.thinkfreeNote.request.DocumentCreateRequest;
import com.thinkfreeNote.thinkfreeNote.request.DocumentUpdateRequest;
import com.thinkfreeNote.thinkfreeNote.response.DocumentResponse;
import com.thinkfreeNote.thinkfreeNote.response.DocumentTitleResponse;
import com.thinkfreeNote.thinkfreeNote.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/documents")
public class DocumentController {
    private final DocumentService documentService;

    @PostMapping
    public Long createDocument(@RequestBody DocumentCreateRequest request) throws Exception {
        return documentService.createDocument(request);
    }

    @GetMapping("/{id}")
    public DocumentResponse getDocument(@PathVariable Long id) throws Exception {
        return documentService.getDocument(id);
    }

    @GetMapping("/titles")
    public List<DocumentTitleResponse> getTitleList() {
        return documentService.getTitleList();
    }

    @PatchMapping
    public Long updateDocument(@RequestBody DocumentUpdateRequest request) throws Exception {
        return documentService.updateDocument(request);
    }
}
