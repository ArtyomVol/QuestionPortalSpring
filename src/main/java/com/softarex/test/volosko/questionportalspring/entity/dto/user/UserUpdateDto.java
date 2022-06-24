package com.softarex.test.volosko.questionportalspring.entity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class UserUpdateDto {
    private String email;

    private String password;

    private String newPassword;

    private String firstName;

    private String lastName;

    private String phoneNumber;
}