package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.UserIsNotAuthorizedException;

import java.util.List;

public interface QuestionService {
    List<Question> getQuestionsByFromUser(User fromUser) throws UserIsNotAuthorizedException;

    void createQuestion(Question question);

    void deleteQuestion(Question question);

    void editQuestion(Question question);

    List<Question> getQuestionsByFromUserWithPagination(User fromUser, int questionsPerPage, int pageNum) throws UserIsNotAuthorizedException;

    int getQuestionsByFromUserCount(User fromUser) throws UserIsNotAuthorizedException;
}
