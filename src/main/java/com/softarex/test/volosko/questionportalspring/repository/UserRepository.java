package com.softarex.test.volosko.questionportalspring.repository;

import com.softarex.test.volosko.questionportalspring.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findAll();
}
