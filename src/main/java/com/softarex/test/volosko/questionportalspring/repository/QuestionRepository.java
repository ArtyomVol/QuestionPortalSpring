package com.softarex.test.volosko.questionportalspring.repository;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface QuestionRepository extends CrudRepository<Question, Long> {
    List<Question> getQuestionsByFromUser(User user);

    @Query (value = "SELECT * FROM question WHERE from_user = :fromUserId ORDER BY id LIMIT :limit OFFSET :offset", nativeQuery = true)
    List<Question> getQuestionsByFromUserIdWithLimitAndOffset(long fromUserId, int limit, int offset);

    @Query (value = "SELECT COUNT(*) FROM question WHERE from_user = :fromUserId", nativeQuery = true)
    int getQuestionsByFromUserCount(long fromUserId);
}
