package com.softarex.test.volosko.questionportalspring.service.implementation;

import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.*;
import com.softarex.test.volosko.questionportalspring.repository.UserRepository;
import com.softarex.test.volosko.questionportalspring.service.UserService;
import com.softarex.test.volosko.questionportalspring.util.EmailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    @Autowired
    private final JavaMailSender javaMailSender = new JavaMailSenderImpl();

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserByEmail(String email) throws UserIsMissingException {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserIsMissingException(email));
    }

    @Override
    public void createUser(User user) throws UserAlreadyExistsException, InvalidMailFormatException {
        try {
            getUserByEmail(user.getEmail());
            throw new UserAlreadyExistsException(user.getEmail());
        }
        catch (UserIsMissingException ex){
            EmailDTO emailDTO = new EmailDTO(user.getEmail());
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            emailDTO.InitializeRegistrationMail(user.getPassword());
            simpleMailMessage.setFrom(emailDTO.getEmailFrom());
            simpleMailMessage.setTo(emailDTO.getEmailTo());
            simpleMailMessage.setText(emailDTO.getMessage());
            simpleMailMessage.setSubject(emailDTO.getMailSubject());
            try{
                javaMailSender.send(simpleMailMessage);
            }
            catch (Exception e) {
                throw new InvalidMailFormatException(user.getEmail());
            }
            user.setPassword((DigestUtils.md5DigestAsHex(user.getPassword().getBytes(StandardCharsets.UTF_8))));
            userRepository.save(user);
        }
    }

    @Override
    public User getUserByEmailAndPassword(String email, String password) throws UserLoginException {
        User user = getUserByEmail(email);
        if (user.getPassword().equals(DigestUtils.md5DigestAsHex(password.getBytes(StandardCharsets.UTF_8)))){
            return user;
        }
        throw new UserLoginException();
    }

    @Override
    public void changeUserData(User user, User newUserData) {
        user.updateData(newUserData, false);
        userRepository.save(user);
    }

    @Override
    public void checkUserPassword(User user, String password) throws UserWrongPasswordException {
        if (!user.getPassword().equals(DigestUtils.md5DigestAsHex(password.getBytes(StandardCharsets.UTF_8)))) {
            throw new UserWrongPasswordException();
        }
    }

    @Override
    public void deleteUserWithPasswordChecking(User user, String password) throws UserWrongPasswordException {
        checkUserPassword(user, password);
        userRepository.delete(user);
    }

}
