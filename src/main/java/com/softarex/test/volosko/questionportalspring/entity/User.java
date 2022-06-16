package com.softarex.test.volosko.questionportalspring.entity;

import lombok.*;
import org.springframework.util.DigestUtils;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    @SequenceGenerator(name = "user_seq", sequenceName = "user_id_seq", allocationSize = 1)
    @Column(name = "id")
    @Setter(value = AccessLevel.PRIVATE)
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    public User(String email, String password, String firstName, String lastName,
                String phoneNumber) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }

    public void updateData(User newUserData, boolean isPasswordEncrypted) {
        email = newUserData.email;
        if (!newUserData.password.equals("")) {
            if (isPasswordEncrypted) {
                password = newUserData.password;
            } else {
                password = DigestUtils.md5DigestAsHex(password.getBytes(StandardCharsets.UTF_8));
            }
        }
        firstName = newUserData.firstName;
        lastName = newUserData.lastName;
        phoneNumber = newUserData.phoneNumber;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                '}';
    }
}
