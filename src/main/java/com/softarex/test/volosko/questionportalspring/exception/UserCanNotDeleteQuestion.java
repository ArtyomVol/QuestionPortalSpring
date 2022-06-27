package com.softarex.test.volosko.questionportalspring.exception;

public class UserCanNotDeleteQuestion extends QuestionPortalException{
    public UserCanNotDeleteQuestion(String email) {
        super("User with email" + email + " can not delete this question.");
    }
}
