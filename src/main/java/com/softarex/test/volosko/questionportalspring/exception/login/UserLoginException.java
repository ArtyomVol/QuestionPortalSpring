package com.softarex.test.volosko.questionportalspring.exception.login;

import com.softarex.test.volosko.questionportalspring.exception.QuestionPortalException;

public class UserLoginException extends QuestionPortalException {
    public UserLoginException() {
        super("Data entered incorrectly.");
    }

    public UserLoginException(String msg) {
        super(msg);
    }
}
