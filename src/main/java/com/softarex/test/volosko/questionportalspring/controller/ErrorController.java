package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.dto.Message;
import com.softarex.test.volosko.questionportalspring.exception.QuestionPortalException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorController {

    @ExceptionHandler(QuestionPortalException.class)
    public ResponseEntity<Message> handleException(QuestionPortalException ex) {
        return new ResponseEntity<>(new Message(ex.getMessage()), HttpStatus.NOT_ACCEPTABLE);
    }
}
