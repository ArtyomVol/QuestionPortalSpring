package com.softarex.test.volosko.questionportalspring.util;

import com.softarex.test.volosko.questionportalspring.constants.EmailConstants;
import lombok.*;
import org.springframework.mail.SimpleMailMessage;

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

    public SimpleMailMessage InitializeRegistrationMail(String password) {
        emailFrom = EmailConstants.EMAIL_FROM_ADDRESS;
        message = EmailConstants.REGISTRATION_MESSAGE.replaceFirst("§1§", emailTo).
                replaceFirst("§2§", password);
        mailSubject = EmailConstants.REGISTRATION_SUBJECT;
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        setParametersToSimpleMailMessage(simpleMailMessage);
        return simpleMailMessage;
    }

    public SimpleMailMessage InitializeDeletingMail() {
        emailFrom = EmailConstants.EMAIL_FROM_ADDRESS;
        message = EmailConstants.PROFILE_DELETING_MESSAGE;
        mailSubject = EmailConstants.PROFILE_DELETING_SUBJECT;
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        setParametersToSimpleMailMessage(simpleMailMessage);
        return simpleMailMessage;
    }

    private void setParametersToSimpleMailMessage(SimpleMailMessage simpleMailMessage) {
        simpleMailMessage.setFrom(emailFrom);
        simpleMailMessage.setTo(emailTo);
        simpleMailMessage.setText(message);
        simpleMailMessage.setSubject(mailSubject);
    }
}
