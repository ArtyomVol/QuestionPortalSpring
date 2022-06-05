package com.softarex.test.volosko.questionportalspring.util;

import com.softarex.test.volosko.questionportalspring.constants.EmailConstants;
import lombok.*;

@Getter
@Setter
public class EmailDTO {
    private String emailTo;
    private String emailFrom;
    private String message;
    private String mailSubject;

    public EmailDTO(String emailTo) {
        this.emailTo = emailTo;
    }

    public void InitializeRegistrationMail(String password) {
        emailFrom = EmailConstants.EMAIL_FROM_ADDRESS;
        message = EmailConstants.REGISTRATION_MESSAGE.replaceFirst("§1§", emailTo).
                replaceFirst("§2§", password);
        mailSubject = EmailConstants.REGISTRATION_SUBJECT;
    }
}
