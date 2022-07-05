package com.softarex.test.volosko.questionportalspring.entity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserConfirmationCodeDto {
    private String email;

    private String newPassword;

    private String confirmationCode;
}
