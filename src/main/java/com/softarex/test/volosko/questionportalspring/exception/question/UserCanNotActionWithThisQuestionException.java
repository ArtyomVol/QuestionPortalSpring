package com.softarex.test.volosko.questionportalspring.exception.question;

import com.softarex.test.volosko.questionportalspring.exception.QuestionPortalException;

public class UserCanNotActionWithThisQuestionException extends QuestionPortalException {
    public UserCanNotActionWithThisQuestionException(String msg) {
        super(msg);
    }
}
