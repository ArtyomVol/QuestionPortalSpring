package com.softarex.test.volosko.questionportalspring.entity.dto.user;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserLoginDto {
    private String email;

    private String password;
}
