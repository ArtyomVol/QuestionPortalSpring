package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.AnswerType;
import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.UserIsMissingException;
import com.softarex.test.volosko.questionportalspring.service.AnswerTypeService;
import com.softarex.test.volosko.questionportalspring.service.implementation.AnswerTypeServiceImpl;
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
@RequestMapping("/api/v1/answer-type")
public class AnswerTypeController {
    private final AnswerTypeService answerTypeService;

    @Autowired
    public AnswerTypeController(AnswerTypeService answerTypeService) {
        this.answerTypeService = answerTypeService;
    }

    @GetMapping(value = "/get-all", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<?>> getAll() throws UserIsMissingException {
        List<AnswerType> answerTypes = answerTypeService.getAllAnswerTypes();
        return new ResponseEntity<>(answerTypes, HttpStatus.OK);
    }
}
