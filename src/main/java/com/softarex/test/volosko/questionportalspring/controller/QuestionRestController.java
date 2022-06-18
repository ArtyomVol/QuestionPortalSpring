package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.Message;
import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.UserIsMissingException;
import com.softarex.test.volosko.questionportalspring.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/v1/question")
public class QuestionRestController {
    private final QuestionService questionService;

    @Autowired
    public QuestionRestController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping(value = "/get_questions_from_session_user", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getQuestionsFromSessionUser(HttpServletRequest request) throws UserIsMissingException {
        User user = (User)request.getSession().getAttribute("user");
        List<Question> questions = questionService.getQuestionsByFromUser(user);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createQuestion(@RequestBody Question question) {
        questionService.createQuestion(question);
        return new ResponseEntity<>(new Message("Question is successfully created"), HttpStatus.CREATED);
    }

    @PostMapping(value = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteQuestion(@RequestBody Question question) {
        questionService.deleteQuestion(question);
        return new ResponseEntity<>(new Message("Question is successfully deleted"), HttpStatus.CREATED);
    }

    @PostMapping(value = "/edit", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editQuestion(@RequestBody Question question) {
        questionService.editQuestion(question);
        return new ResponseEntity<>(new Message("Question is successfully edited"), HttpStatus.CREATED);
    }
}
