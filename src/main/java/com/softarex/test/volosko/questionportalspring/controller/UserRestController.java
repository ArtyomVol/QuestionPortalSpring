package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.dto.Message;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.*;
import com.softarex.test.volosko.questionportalspring.service.rest.UserRestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequestMapping(value = "/api/v1/users")
public class UserRestController {
    private final UserRestService userRestService;

    @Autowired
    public UserRestController(UserRestService userRestService){
        this.userRestService = userRestService;
    }


    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> signIn(@RequestBody UserRegistrationDto user) {
        return userRestService.signIn(user);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> logIn(@RequestBody UserLoginDto userData, HttpServletRequest request) {
        return userRestService.logIn(userData, request);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> changeUserData(@RequestBody UserUpdateDto userUpdateDto, HttpServletRequest request) {
        return userRestService.changeUserData(userUpdateDto, request);
    }

    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> deleteUser(@RequestBody String password, HttpServletRequest request) {
        return userRestService.deleteUserWithPasswordCheck(password, request);
    }

    @GetMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> logOut(HttpServletRequest request) {
        return userRestService.logOut(request);
    }

    @GetMapping(value = "/from/session", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserSessionDto> getUserFromSession(HttpServletRequest request) {
        return userRestService.getUserFromSession(request);
    }

    @GetMapping(value = "/other", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<UserOnlyEmailDto>> getAllOtherUsers(HttpServletRequest request) {
        return userRestService.getAllOtherUsers(request);
    }
}
