package com.thinkfreeNote.thinkfreeNote.controller;


import com.thinkfreeNote.thinkfreeNote.domain.BookMark;
import com.thinkfreeNote.thinkfreeNote.response.BookMarkResponse;
import com.thinkfreeNote.thinkfreeNote.service.BookMarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookmark")
public class BookMarkController {
    private final BookMarkService bookMarkService;

    @GetMapping
    public boolean getBookMark(@RequestParam Long documentId, @RequestParam String userId) throws Exception {
        return bookMarkService.isBookMark(userId, documentId);
    }

    @GetMapping("/{userId}")
    public List<BookMarkResponse> getBookMarkListByUserId(@PathVariable String userId) throws Exception {
        return bookMarkService.getBookMarks(userId);
    }

    @PostMapping
    public Long createBookMark(@RequestParam Long documentId, @RequestParam String userId) throws Exception {
        return bookMarkService.createBookMark(userId,documentId).orElse(-1L);
    }

    @DeleteMapping
    public boolean deleteBookMark(@RequestParam Long documentId, @RequestParam String userId) throws Exception {
        return bookMarkService.deleteBookMark(userId,documentId);
    }



}

