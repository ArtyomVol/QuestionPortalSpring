package com.softarex.test.volosko.questionportalspring.service.rest;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.dto.Message;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.*;
import com.softarex.test.volosko.questionportalspring.mapper.UserMapper;
import com.softarex.test.volosko.questionportalspring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Component
public class UserRestService {
    private final UserService userService;

    @Autowired
    public UserRestService(UserService userService) {
        this.userService = userService;
    }

    public ResponseEntity<Message> signIn(UserRegistrationDto user) {
        userService.createUser(user);
        return new ResponseEntity<>(new Message("Registration success"), HttpStatus.CREATED);
    }

    public ResponseEntity<Message> logIn(UserLoginDto userData, HttpServletRequest request) {
        User user = userService.getUserByEmailAndPassword(userData.getEmail(), userData.getPassword());
        request.getSession().setAttribute("user", user);
        return new ResponseEntity<>(new Message("Login Success"), HttpStatus.CREATED);
    }

    public ResponseEntity<Message> changeUserData(@RequestBody UserUpdateDto userUpdateDto, HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        userService.changeUserData(user, userUpdateDto);
        return new ResponseEntity<>(new Message("User data successfully changed"), HttpStatus.CREATED);
    }

    public ResponseEntity<Message> deleteUserWithPasswordCheck(@RequestBody String password,
                                                                HttpServletRequest request) {
        User user = (User) request.getSession().getAttribute("user");
        password = password.substring(1, password.length() - 1);
        userService.deleteUserWithPasswordChecking(user, password);
        request.getSession().setAttribute("user", null);
        return new ResponseEntity<>(new Message("User successfully deleted"), HttpStatus.IM_USED);
    }

    public ResponseEntity<Message> logOut(HttpServletRequest request) {
        request.getSession().setAttribute("user", null);
        return new ResponseEntity<>(new Message("Logout success"), HttpStatus.IM_USED);
    }

    public ResponseEntity<UserSessionDto> getUserFromSession(HttpServletRequest request) {
        User userEntity = (User) request.getSession().getAttribute("user");
        UserSessionDto user = UserMapper.userEntityToUserSessionDto(userEntity);
        return new ResponseEntity<>(user, HttpStatus.IM_USED);
    }

    public ResponseEntity<List<UserOnlyEmailDto>> getAllOtherUsers(HttpServletRequest request) {
        User currentUser = (User) request.getSession().getAttribute("user");
        List<UserOnlyEmailDto> otherUsers = userService.getAllOtherUsers(currentUser);
        return new ResponseEntity<>(otherUsers, HttpStatus.IM_USED);
    }

    public ResponseEntity<Message> sendConfirmationCode(String userEmail, HttpServletRequest request) {
        String confirmationCode = userService.sendConfirmationCode(userEmail);
        request.getSession().setAttribute("confirmationCode", confirmationCode);
        return new ResponseEntity<>(new Message("Mail with confirmation code is send for your email."),
                HttpStatus.IM_USED);
    }

    public ResponseEntity<Message> changePassword(UserConfirmationCodeDto user,
                                                  HttpServletRequest request) {
        String realConfirmationCode = (String) request.getSession().getAttribute("confirmationCode");
        userService.changePassword(user, realConfirmationCode);
        return new ResponseEntity<>(new Message("Password is successfully changed."),
                HttpStatus.IM_USED);
    }
}
