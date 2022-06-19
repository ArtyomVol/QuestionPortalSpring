package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;

import java.util.List;

public interface QuestionService {
    List<Question> getQuestionsByFromUser(User fromUser);

    void createQuestion(Question question);

    void deleteQuestion(Question question);

    void editQuestion(Question question);

    List<Question> getQuestionsByFromUserWithPagination(User fromUser, int questionsPerPage, int pageNum);

    int getQuestionsByFromUserCount(User fromUser);
}
