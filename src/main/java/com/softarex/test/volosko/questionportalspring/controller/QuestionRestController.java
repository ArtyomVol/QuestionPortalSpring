package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.dto.Message;
import com.softarex.test.volosko.questionportalspring.entity.dto.QuestionDto;
import com.softarex.test.volosko.questionportalspring.service.rest.QuestionRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.HtmlUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/questions")
public class QuestionRestController {
    private final QuestionRestService questionRestService;

    @Autowired
    public QuestionRestController(QuestionRestService questionRestService) {
        this.questionRestService = questionRestService;
    }

    @GetMapping(value = "/from-me/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<QuestionDto>> getAllQuestionsFromSessionUser(HttpServletRequest request) {
        return questionRestService.getAllQuestionsFromSessionUser(request);
    }

    @GetMapping(value = "/for-me/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<QuestionDto>> getAllQuestionsForSessionUser(HttpServletRequest request) {
        return questionRestService.getAllQuestionsForSessionUser(request);
    }

    @GetMapping(value = "/from-me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<QuestionDto>> getQuestionsFromSessionUser(
            @RequestParam(name = "questions-per-page") int questionsPerPage,
            @RequestParam(name = "page-num") int pageNum, HttpServletRequest request) {
        return questionRestService.getQuestionsFromSessionUser(questionsPerPage, pageNum, request);
    }

    @GetMapping(value = "/for-me", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<QuestionDto>> getQuestionsForSessionUser(
            @RequestParam(name = "questions-per-page") int questionsPerPage,
            @RequestParam(name = "page-num") int pageNum, HttpServletRequest request) {
        return questionRestService.getQuestionsForSessionUser(questionsPerPage, pageNum, request);
    }

    @GetMapping(value = "/from-me/count", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> getCountOfQuestionsFromSessionUser(HttpServletRequest request) {
        return questionRestService.getCountOfQuestionsFromSessionUser(request);
    }

    @GetMapping(value = "/for-me/count", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Integer> getCountOfQuestionsForSessionUser(HttpServletRequest request) {
        return questionRestService.getCountOfQuestionsForSessionUser(request);
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> createQuestion(@RequestBody QuestionDto question) {
        return questionRestService.createQuestion(question);
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> deleteQuestion(@PathVariable long id, HttpServletRequest request) {
        return questionRestService.deleteQuestion(id, request);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> editQuestion(@RequestBody QuestionDto question) {
        return questionRestService.editQuestion(question);
    }

    @MessageMapping("/question/answer")
    @SendTo("/question/answer")
    public Message reportQuestionHasBeenAnswered(Message userEmailWhoseQuestionWasAnswered) {
        return new Message(HtmlUtils.htmlEscape(userEmailWhoseQuestionWasAnswered.getMessage()));
    }

    @MessageMapping("/question/change")
    @SendTo("/question/change")
    public Message reportQuestionHasBeenChanged(Message userEmailWhoseQuestionWasChanged) {
        return new Message(HtmlUtils.htmlEscape(userEmailWhoseQuestionWasChanged.getMessage()));
    }
}
