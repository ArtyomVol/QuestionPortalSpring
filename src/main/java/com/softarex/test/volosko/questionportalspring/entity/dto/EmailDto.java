package com.softarex.test.volosko.questionportalspring.entity.dto;

import com.softarex.test.volosko.questionportalspring.constants.EmailConstants;
import lombok.Getter;
import lombok.Setter;
import org.springframework.mail.SimpleMailMessage;

@Getter
@Setter
public class EmailDto {
    private String emailTo;
    private String emailFrom;
    private String message;
    private String mailSubject;

    public EmailDto(String emailTo) {
        this.emailTo = emailTo;
    }

    public SimpleMailMessage initializeRegistrationMail(String password) {
        emailFrom = EmailConstants.EMAIL_FROM_ADDRESS;
        message = EmailConstants.REGISTRATION_MESSAGE.replaceFirst("§1§", emailTo).
                replaceFirst("§2§", password);
        mailSubject = EmailConstants.REGISTRATION_SUBJECT;
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        setParametersToSimpleMailMessage(simpleMailMessage);
        return simpleMailMessage;
    }

    public SimpleMailMessage initializeDeletingMail() {
        emailFrom = EmailConstants.EMAIL_FROM_ADDRESS;
        message = EmailConstants.PROFILE_DELETING_MESSAGE;
        mailSubject = EmailConstants.PROFILE_DELETING_SUBJECT;
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        setParametersToSimpleMailMessage(simpleMailMessage);
        return simpleMailMessage;
    }

    public SimpleMailMessage initializePasswordChangeMail(String confirmationCode) {
        emailFrom = EmailConstants.EMAIL_FROM_ADDRESS;
        message = EmailConstants.PASSWORD_CHANGE_MESSAGE.replaceFirst("§1§", confirmationCode);
        mailSubject = EmailConstants.PASSWORD_CHANGE_SUBJECT;
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
