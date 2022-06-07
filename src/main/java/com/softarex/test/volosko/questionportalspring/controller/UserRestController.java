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


@RestController
@RequestMapping(value = "/api/v1/user")
public class UserRestController {
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "/email", method = RequestMethod.GET, produces = {
            MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE})
    @ResponseBody
    public User getUserByEmail(@PathVariable("userEmail") String email) throws UserIsMissingException {
        User user = null;
        user = userService.getUserByEmail(email);
        return user;
    }

    // DEEEEEEEEEEEEEELEEEEEEEEEEEEEET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    // DEEEEEEEEEEEEEELEEEEEEEEEEEEEET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signIn(@RequestBody User user) throws InvalidMailFormatException, UserAlreadyExistsException {
        userService.createUser(user);
        return new ResponseEntity<>(new Message("Registration success"), HttpStatus.CREATED);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logIn(@RequestBody User userData) throws UserLoginException {
        User user = userService.getUserByEmailAndPassword(userData.getEmail(), userData.getPassword());
        return new ResponseEntity<>(new Message("Login success"), HttpStatus.CREATED);
    }

    /*
    @GetMapping(value = "/email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserByEmail(@RequestParam(name = "email") String email){
        User user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }*/

    @ExceptionHandler(QuestionPortalException.class)
    public ResponseEntity<?> handleException(QuestionPortalException ex) {
        return new ResponseEntity<>(new Message(ex.getMessage()), HttpStatus.NOT_ACCEPTABLE);
    }
}
