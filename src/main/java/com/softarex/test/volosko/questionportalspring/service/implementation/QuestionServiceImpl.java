package com.softarex.test.volosko.questionportalspring.service.implementation;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.repository.QuestionRepository;
import com.softarex.test.volosko.questionportalspring.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionServiceImpl(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @Override
    public List<Question> getQuestionsByFromUser(User fromUser) {
        return questionRepository.getQuestionsByFromUser(fromUser);
    }
}
