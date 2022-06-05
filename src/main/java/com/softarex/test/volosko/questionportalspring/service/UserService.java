package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.InvalidMailFormatException;
import com.softarex.test.volosko.questionportalspring.exception.UserAlreadyExistsException;
import com.softarex.test.volosko.questionportalspring.exception.UserIsMissingException;
import com.softarex.test.volosko.questionportalspring.exception.UserLoginException;

import java.util.List;


public interface UserService {
    User getUserByEmail(String email) throws UserIsMissingException;
    List<User> getAllUsers();
    void createUser(User user) throws UserAlreadyExistsException, InvalidMailFormatException;
    User getUserByEmailAndPassword(String email, String password) throws UserLoginException;
}
