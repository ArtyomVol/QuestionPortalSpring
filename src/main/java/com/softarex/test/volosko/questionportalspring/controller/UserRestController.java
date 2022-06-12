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

    @PostMapping(value = "/change-data", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeUserData(@RequestBody User newUserData, HttpServletRequest request) {
        User user = (User)request.getSession().getAttribute("user");
        userService.changeUserData(user, newUserData);
        return new ResponseEntity<>(new Message("Login Success"), HttpStatus.CREATED);
    }

    @PostMapping(value = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteUser(@RequestBody String password, HttpServletRequest request)
            throws UserWrongPasswordException {
        User user = (User)request.getSession().getAttribute("user");
        password = password.substring(1, password.length()-1);
        userService.deleteUserWithPasswordChecking(user, password);
        request.getSession().setAttribute("user", null);
        return new ResponseEntity<>(new Message("User successfully deleted"), HttpStatus.IM_USED);
    }

    @PostMapping(value = "/check-password", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> changeUserData(@RequestBody String password, HttpServletRequest request)
            throws UserWrongPasswordException {
        User user = (User)request.getSession().getAttribute("user");
        password = password.substring(1, password.length()-1);
        userService.checkUserPassword(user, password);
        return new ResponseEntity<>(new Message("Password is correct"), HttpStatus.CREATED);
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
