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
    private static AnswerTypeService answerTypeService;

    @Autowired
    public AnswerTypeRestService(AnswerTypeService answerTypeService) {
        AnswerTypeRestService.answerTypeService = answerTypeService;
    }

    public static ResponseEntity<List<?>> getAll() {
        List<AnswerTypeDto> answerTypes = answerTypeService.getAllAnswerTypes();
        return new ResponseEntity<>(answerTypes, HttpStatus.OK);
    }

}
