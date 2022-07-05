package com.softarex.test.volosko.questionportalspring.exception.registration;

public class UserAlreadyExistsException extends UserRegistrationException {
    public UserAlreadyExistsException(String email) {
        super("User with email \"" + email + "\" is already exist.");
    }
}
