package com.softarex.test.volosko.questionportalspring.entity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserRegistrationDto {
    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String phoneNumber;
}
