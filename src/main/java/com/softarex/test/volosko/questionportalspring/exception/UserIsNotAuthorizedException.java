package com.softarex.test.volosko.questionportalspring.exception;

public class UserIsNotAuthorizedException extends QuestionPortalException {
    public UserIsNotAuthorizedException() {
        super("User is not authorized in the system.");
    }
}
