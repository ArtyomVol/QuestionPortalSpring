package com.softarex.test.volosko.questionportalspring.exception.question;

public class UserCanNotDeleteQuestionException extends UserCanNotActionWithThisQuestionException {
    public UserCanNotDeleteQuestionException(String email) {
        super("User with email " + email + " can not delete this question.");
    }
}
