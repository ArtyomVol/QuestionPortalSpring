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

    @GetMapping(value = "/get_questions_from_session_user/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getAllQuestionsFromSessionUser(HttpServletRequest request) {
        return QuestionRestService.getAllQuestionsFromSessionUser(request);
    }

    @GetMapping(value = "/get_questions_from_session_user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getQuestionsFromSessionUser(
            @RequestParam(name = "questions_per_page") int questionsPerPage,
            @RequestParam(name = "page_num") int pageNum, HttpServletRequest request) {
        return QuestionRestService.getQuestionsFromSessionUser(questionsPerPage, pageNum, request);
    }

    @GetMapping(value = "/count", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCountOfQuestionsFromSessionUser(HttpServletRequest request) {
        return QuestionRestService.getCountOfQuestionsFromSessionUser(request);
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createQuestion(@RequestBody QuestionDto question) {
        return QuestionRestService.createQuestion(question);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteQuestion(@PathVariable long id) {
        return QuestionRestService.deleteQuestion(id);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editQuestion(@RequestBody QuestionDto question) {
        return QuestionRestService.editQuestion(question);
    }
}
