package com.softarex.test.volosko.questionportalspring.controller;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.Message;
import com.softarex.test.volosko.questionportalspring.exception.UserIsMissingException;
import com.softarex.test.volosko.questionportalspring.exception.UserLoginException;
import com.softarex.test.volosko.questionportalspring.exception.UserRegistrationException;
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
    public User getUserByEmail(@PathVariable("userEmail") String email){
        User user = null;
        try {
            user = userService.getUserByEmail(email);
        } catch (UserIsMissingException e) {
            e.printStackTrace();
        }
        return user;
    }

    // DEEEEEEEEEEEEEELEEEEEEEEEEEEEET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUsers(){
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }
    // DEEEEEEEEEEEEEELEEEEEEEEEEEEEET!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> signIn(@RequestBody User user){
        try {
            userService.createUser(user);
        } catch (UserRegistrationException e) {
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(new Message("Registration success"), HttpStatus.CREATED);
    }

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> logIn(@RequestBody User userData){
        try {
            User user = userService.getUserByEmailAndPassword(userData.getEmail(), userData.getPassword());
        } catch (UserLoginException e) {
            return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(new Message("Login success"), HttpStatus.CREATED);
    }

    /*
    @GetMapping(value = "/email", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUserByEmail(@RequestParam(name = "email") String email){
        User user = userService.getUserByEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }*/

}
