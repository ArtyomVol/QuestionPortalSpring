package com.softarex.test.volosko.questionportalspring.exception;

public class UserEditWrongPasswordException extends UserEditException{
    public UserEditWrongPasswordException() {
        super("Password entered incorrectly.");
    }
}
