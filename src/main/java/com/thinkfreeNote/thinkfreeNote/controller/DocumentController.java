package com.thinkfreeNote.thinkfreeNote.controller;

import com.thinkfreeNote.thinkfreeNote.dto.DocumentDto;
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
    public DocumentDto createDocument(@RequestBody DocumentDto request) throws Exception {
        return documentService.createDocument(request);
    }

}
