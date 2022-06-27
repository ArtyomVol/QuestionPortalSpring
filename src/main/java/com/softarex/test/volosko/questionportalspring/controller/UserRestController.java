package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserLoginDto;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserRegistrationDto;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserUpdateDto;
import com.softarex.test.volosko.questionportalspring.service.rest.UserRestService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping(value = "/api/v1/users")
public class UserRestController {
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signIn(@RequestBody UserRegistrationDto user) {
        return UserRestService.signIn(user);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logIn(@RequestBody UserLoginDto userData, HttpServletRequest request) {
        return UserRestService.logIn(userData, request);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeUserData(@RequestBody UserUpdateDto userUpdateDto, HttpServletRequest request) {
        return UserRestService.changeUserData(userUpdateDto, request);
    }

    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteUser(@RequestBody String password, HttpServletRequest request) {
        return UserRestService.deleteUserWithPasswordCheck(password, request);
    }

    @GetMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logOut(HttpServletRequest request) {
        return UserRestService.logOut(request);
    }

    @GetMapping(value = "/from/session", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserFromSession(HttpServletRequest request) {
        return UserRestService.getUserFromSession(request);
    }

    @GetMapping(value = "/other", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllOtherUsers(HttpServletRequest request) {
        return UserRestService.getAllOtherUsers(request);
    }
}
