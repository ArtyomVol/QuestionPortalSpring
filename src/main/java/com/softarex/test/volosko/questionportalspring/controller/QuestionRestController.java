package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.dto.QuestionDto;
import com.softarex.test.volosko.questionportalspring.service.rest.QuestionRestService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionRestController {

    @GetMapping(value = "/from-me/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getAllQuestionsFromSessionUser(HttpServletRequest request) {
        return QuestionRestService.getAllQuestionsFromSessionUser(request);
    }

    @GetMapping(value = "/for-me/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getAllQuestionsForSessionUser(HttpServletRequest request) {
        return QuestionRestService.getAllQuestionsForSessionUser(request);
    }

    @GetMapping(value = "/from-me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getQuestionsFromSessionUser(
            @RequestParam(name = "questions-per-page") int questionsPerPage,
            @RequestParam(name = "page-num") int pageNum, HttpServletRequest request) {
        return QuestionRestService.getQuestionsFromSessionUser(questionsPerPage, pageNum, request);
    }

    @GetMapping(value = "/for-me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getQuestionsForSessionUser(
            @RequestParam(name = "questions-per-page") int questionsPerPage,
            @RequestParam(name = "page-num") int pageNum, HttpServletRequest request) {
        return QuestionRestService.getQuestionsForSessionUser(questionsPerPage, pageNum, request);
    }

    @GetMapping(value = "/from-me/count", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCountOfQuestionsFromSessionUser(HttpServletRequest request) {
        return QuestionRestService.getCountOfQuestionsFromSessionUser(request);
    }

    @GetMapping(value = "/for-me/count", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCountOfQuestionsForSessionUser(HttpServletRequest request) {
        return QuestionRestService.getCountOfQuestionsForSessionUser(request);
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createQuestion(@RequestBody QuestionDto question) {
        return QuestionRestService.createQuestion(question);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteQuestion(@PathVariable long id, HttpServletRequest request) {
        return QuestionRestService.deleteQuestion(id, request);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editQuestion(@RequestBody QuestionDto question) {
        return QuestionRestService.editQuestion(question);
    }
}
