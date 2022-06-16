package com.softarex.test.volosko.questionportalspring.repository;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionRepository extends CrudRepository<Question, Long> {
    List<Question> getQuestionsByFromUser(User user);
}
