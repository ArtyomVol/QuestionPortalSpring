package com.softarex.test.volosko.questionportalspring.mapper;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserOnlyEmailDto;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserRegistrationDto;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserSessionDto;

public class UserMapper {

    public static User userDtoToUserEntity(UserRegistrationDto userDto) {
        return new User(userDto.getEmail(), userDto.getPassword(), userDto.getFirstName(), userDto.getLastName(),
                userDto.getPhoneNumber());
    }

    public static UserSessionDto userEntityToUserSessionDto(User user) {
        if (user != null) {
            return new UserSessionDto(user.getEmail(), user.getFirstName(), user.getLastName(), user.getPhoneNumber());
        }
        return null;
    }

    public static UserOnlyEmailDto userEntityToUserOnlyEmailDto(User user) {
        return new UserOnlyEmailDto(user.getEmail());
    }

}
