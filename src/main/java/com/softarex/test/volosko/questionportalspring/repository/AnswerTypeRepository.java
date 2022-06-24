package com.softarex.test.volosko.questionportalspring.repository;

import com.softarex.test.volosko.questionportalspring.entity.AnswerType;
import org.springframework.data.repository.CrudRepository;

public interface AnswerTypeRepository extends CrudRepository<AnswerType, Long> {
    AnswerType findByType(String type);
}
