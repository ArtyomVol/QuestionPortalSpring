package com.softarex.test.volosko.questionportalspring.exception.registration;

public class InvalidMailFormatException extends UserRegistrationException {
    public InvalidMailFormatException(String email) {
        super("The email \"" + email + "\" is wrong format.");
    }
}
