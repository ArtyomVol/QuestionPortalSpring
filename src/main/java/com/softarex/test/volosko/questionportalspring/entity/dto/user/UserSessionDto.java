package com.softarex.test.volosko.questionportalspring.entity.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserSessionDto {
    private String email;

    private String firstName;

    private String lastName;
}
