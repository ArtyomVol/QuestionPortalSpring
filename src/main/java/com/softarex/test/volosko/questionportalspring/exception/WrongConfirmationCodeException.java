package com.softarex.test.volosko.questionportalspring.exception;

public class WrongConfirmationCodeException extends QuestionPortalException{
    public WrongConfirmationCodeException() {
        super("Confirmation code is wrong.");
    }
}
