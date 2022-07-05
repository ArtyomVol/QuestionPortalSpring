package com.softarex.test.volosko.questionportalspring.exception.question;

public class UserCanNotAddQuestionException extends UserCanNotActionWithThisQuestionException {
    public UserCanNotAddQuestionException(String email) {
        super("User with email " + email + " can not add this question.");
    }
}