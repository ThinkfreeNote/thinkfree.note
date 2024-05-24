package com.thinkfreeNote.thinkfreeNote.controller;

import com.thinkfreeNote.thinkfreeNote.request.DocumentCreateRequest;
import com.thinkfreeNote.thinkfreeNote.response.DocumentCreateResponse;
import com.thinkfreeNote.thinkfreeNote.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/documents")
public class DocumentController {
    private final DocumentService documentService;

    @PostMapping
    public DocumentCreateResponse createDocument(@RequestBody DocumentCreateRequest request) throws Exception {
        return documentService.createDocument(request);
    }

}
