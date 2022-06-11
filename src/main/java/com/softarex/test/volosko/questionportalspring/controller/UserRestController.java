package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.Message;
import com.softarex.test.volosko.questionportalspring.exception.*;
import com.softarex.test.volosko.questionportalspring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RestController
@RequestMapping(value = "/api/v1/user")
public class UserRestController {
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signIn(@RequestBody User user) throws UserRegistrationException {
        userService.createUser(user);
        return new ResponseEntity<>(new Message("Registration success"), HttpStatus.CREATED);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logIn(@RequestBody User userData, HttpServletRequest request) throws UserLoginException {
        User user = userService.getUserByEmailAndPassword(userData.getEmail(), userData.getPassword());
        request.getSession().setAttribute("user", user);
        return new ResponseEntity<>(new Message("Login Success"), HttpStatus.CREATED);
    }

    @GetMapping(value = "/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logOut(HttpServletRequest request) {
        request.getSession().setAttribute("user", null);
        return new ResponseEntity<>(new Message("Logout success"), HttpStatus.IM_USED);
    }

    @GetMapping(value = "/get-user-from-session", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserFromSession(HttpServletRequest request) {
        User user = (User)request.getSession().getAttribute("user");
        return new ResponseEntity<>(user, HttpStatus.IM_USED);
    }
}
