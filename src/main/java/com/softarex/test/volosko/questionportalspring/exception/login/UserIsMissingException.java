package com.softarex.test.volosko.questionportalspring.exception.login;

public class UserIsMissingException extends UserLoginException {
    public UserIsMissingException(String email) {
        super("User with email \"" + email + "\" is missing.");
    }
}
