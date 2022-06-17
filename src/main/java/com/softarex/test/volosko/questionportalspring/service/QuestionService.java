package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;

import java.util.List;

public interface QuestionService {
    public List<Question> getQuestionsByFromUser(User fromUser);

    public void createQuestion(Question question);
}
