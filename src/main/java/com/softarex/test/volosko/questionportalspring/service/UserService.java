package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.*;

import java.util.List;


public interface UserService {
    User getUserByEmail(String email) throws UserIsMissingException;
    void createUser(User user) throws UserAlreadyExistsException, InvalidMailFormatException;
    User getUserByEmailAndPassword(String email, String password) throws UserLoginException;
    void changeUserData(User user, User newUserData);
    void checkUserPassword(User user, String password) throws UserWrongPasswordException;
    void deleteUserWithPasswordChecking(User user, String password) throws UserWrongPasswordException;
    List<User> getAllOtherUsers(User currentUser);
}
