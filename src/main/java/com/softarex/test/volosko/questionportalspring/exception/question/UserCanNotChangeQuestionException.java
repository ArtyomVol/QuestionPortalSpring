package com.softarex.test.volosko.questionportalspring.exception.question;

public class UserCanNotChangeQuestionException extends UserCanNotActionWithThisQuestionException {
    public UserCanNotChangeQuestionException(String email) {
        super("User with email " + email + " can not change this question.");
    }
}