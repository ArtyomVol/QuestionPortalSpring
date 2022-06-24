package com.softarex.test.volosko.questionportalspring.exception;

public class UserWrongPasswordException extends UserChangeException {
    public UserWrongPasswordException() {
        super("Password entered incorrectly.");
    }
}
