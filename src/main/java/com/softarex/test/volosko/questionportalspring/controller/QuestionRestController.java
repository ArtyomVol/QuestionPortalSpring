package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.UserIsMissingException;
import com.softarex.test.volosko.questionportalspring.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
