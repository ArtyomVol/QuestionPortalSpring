package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.dto.EmailDto;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserOnlyEmailDto;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserRegistrationDto;
import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserUpdateDto;
import com.softarex.test.volosko.questionportalspring.exception.*;
import com.softarex.test.volosko.questionportalspring.mapper.UserMapper;
import com.softarex.test.volosko.questionportalspring.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender = new JavaMailSenderImpl();

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserIsMissingException(email));
    }

    public void createUser(UserRegistrationDto userDto) {
        try {
            getUserByEmail(userDto.getEmail());
            throw new UserAlreadyExistsException(userDto.getEmail());
        } catch (UserIsMissingException ex) {
            EmailDto emailDTO = new EmailDto(userDto.getEmail());
            SimpleMailMessage simpleMailMessage = emailDTO.initializeRegistrationMail(userDto.getPassword());
            try {
                javaMailSender.send(simpleMailMessage);
            } catch (Exception e) {
                throw new InvalidMailFormatException(userDto.getEmail());
            }
            userDto.setPassword((encryptPassword(userDto.getPassword())));
            userRepository.save(UserMapper.userDtoToUserEntity(userDto));
        }
    }

    public User getUserByEmailAndPassword(String email, String password) {
        User user = getUserByEmail(email);
        if (user.getPassword().equals(encryptPassword(password))) {
            return user;
        }
        throw new UserLoginException();
    }

    public void changeUserData(User user, UserUpdateDto userUpdateDto) {
        checkUserPassword(user, userUpdateDto.getPassword());
        updateUserData(user, userUpdateDto);
        userRepository.save(user);
    }

    private void checkUserPassword(User user, String password) {
        if (!user.getPassword().equals(encryptPassword(password))) {
            throw new UserWrongPasswordException();
        }
    }

    private void updateUserData(User user, UserUpdateDto newUserData) {
        user.setEmail(newUserData.getEmail());
        String newPassword = newUserData.getNewPassword();
        if (!newPassword.equals("")) {
            user.setPassword(encryptPassword(newPassword));
        }
        user.setFirstName(newUserData.getFirstName());
        user.setLastName(newUserData.getLastName());
        user.setPhoneNumber(newUserData.getPhoneNumber());
    }

    public void deleteUserWithPasswordChecking(User user, String password) {
        checkUserPassword(user, password);
        userRepository.delete(user);
        EmailDto emailDTO = new EmailDto(user.getEmail());
        SimpleMailMessage simpleMailMessage = emailDTO.initializeDeletingMail();
        javaMailSender.send(simpleMailMessage);
    }

    public List<UserOnlyEmailDto> getAllOtherUsers(User currentUser) {
        List<User> otherUsersDao = userRepository.getAllByEmailIsNot(currentUser.getEmail());
        List<UserOnlyEmailDto> otherUsersDto = new ArrayList<>();
        for (User otherUserDao : otherUsersDao) {
            otherUsersDto.add(UserMapper.userEntityToUserOnlyEmailDto(otherUserDao));
        }
        return otherUsersDto;
    }

    private String encryptPassword(String password) {
        return DigestUtils.md5DigestAsHex(password.getBytes(StandardCharsets.UTF_8));
    }

}
