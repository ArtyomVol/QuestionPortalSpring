package com.softarex.test.volosko.questionportalspring.exception;

public class UserAlreadyExistsException extends UserRegistrationException {
    public UserAlreadyExistsException(String email) {
        super("User with email \"" + email + "\" is already exist.");
    }
}
