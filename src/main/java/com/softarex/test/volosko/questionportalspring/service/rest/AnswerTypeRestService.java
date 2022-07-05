package com.softarex.test.volosko.questionportalspring.service.rest;

import com.softarex.test.volosko.questionportalspring.entity.dto.AnswerTypeDto;
import com.softarex.test.volosko.questionportalspring.service.AnswerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AnswerTypeRestService {
    private final AnswerTypeService answerTypeService;

    @Autowired
    public AnswerTypeRestService(AnswerTypeService answerTypeService) {
        this.answerTypeService = answerTypeService;
    }

    public ResponseEntity<List<AnswerTypeDto>> getAll() {
        List<AnswerTypeDto> answerTypes = answerTypeService.getAllAnswerTypes();
        return new ResponseEntity<>(answerTypes, HttpStatus.OK);
    }

}
