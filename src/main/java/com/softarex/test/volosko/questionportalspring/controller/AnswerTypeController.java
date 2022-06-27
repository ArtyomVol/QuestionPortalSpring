package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.dto.AnswerTypeDto;
import com.softarex.test.volosko.questionportalspring.service.rest.AnswerTypeRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/answer/types")
public class AnswerTypeController {
    private final AnswerTypeRestService answerTypeRestService;

    @Autowired
    public AnswerTypeController(AnswerTypeRestService answerTypeRestService){
        this.answerTypeRestService = answerTypeRestService;
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AnswerTypeDto>> getAll() {
        return answerTypeRestService.getAll();
    }
}
