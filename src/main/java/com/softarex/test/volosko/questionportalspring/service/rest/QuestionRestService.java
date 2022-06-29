package com.softarex.test.volosko.questionportalspring.service.rest;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.dto.Message;
import com.softarex.test.volosko.questionportalspring.entity.dto.QuestionDto;
import com.softarex.test.volosko.questionportalspring.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Component
public class QuestionRestService {
    private final QuestionService questionService;

    @Autowired
    public QuestionRestService(QuestionService questionService) {
        this.questionService = questionService;
    }

    public ResponseEntity<List<QuestionDto>> getAllQuestionsFromSessionUser(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        List<QuestionDto> questions = questionService.getQuestionsByFromUser(user);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionDto>> getAllQuestionsForSessionUser(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        List<QuestionDto> questions = questionService.getQuestionsByForUser(user);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionDto>> getQuestionsFromSessionUser(
            int questionsPerPage, int pageNum, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        List<QuestionDto> questions = questionService.getQuestionsByFromUserWithPagination(
                user, questionsPerPage, pageNum);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    public ResponseEntity<List<QuestionDto>> getQuestionsForSessionUser(
            int questionsPerPage, int pageNum, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        List<QuestionDto> questions = questionService.getQuestionsByForUserWithPagination(
                user, questionsPerPage, pageNum);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    public ResponseEntity<Message> createQuestion(QuestionDto question, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        questionService.createQuestion(question, user);
        return new ResponseEntity<>(new Message("Question is successfully created"), HttpStatus.CREATED);
    }

    public ResponseEntity<Message> deleteQuestion(long id, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        questionService.deleteQuestionById(id, user);
        return new ResponseEntity<>(new Message("Question is successfully deleted"), HttpStatus.CREATED);
    }

    public ResponseEntity<Integer> getCountOfQuestionsFromSessionUser(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        int questionsCount = questionService.getQuestionsByFromUserCount(user);
        return new ResponseEntity<>(questionsCount, HttpStatus.OK);
    }

    public ResponseEntity<Integer> getCountOfQuestionsForSessionUser(HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        int questionsCount = questionService.getQuestionsByForUserCount(user);
        return new ResponseEntity<>(questionsCount, HttpStatus.OK);
    }

    public ResponseEntity<Message> editQuestion(QuestionDto question, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        questionService.editQuestion(question, user);
        return new ResponseEntity<>(new Message("Question is successfully edited"), HttpStatus.CREATED);
    }
}
