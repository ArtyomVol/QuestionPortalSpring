package com.softarex.test.volosko.questionportalspring.service.implementation;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.exception.UserIsNotAuthorizedException;
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
    public List<Question> getQuestionsByFromUser(User fromUser) throws UserIsNotAuthorizedException {
        if (fromUser == null) {
            throw new UserIsNotAuthorizedException();
        }
        return questionRepository.getQuestionsByFromUser(fromUser);
    }

    @Override
    public void createQuestion(Question question) {
        questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Question question) {
        questionRepository.delete(question);
    }

    @Override
    public void editQuestion(Question question) {
        questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestionsByFromUserWithPagination(User fromUser, int questionsPerPage, int pageNum)
            throws UserIsNotAuthorizedException {
        if (fromUser == null) {
            throw new UserIsNotAuthorizedException();
        }
        int offset = (pageNum - 1) * questionsPerPage;
        return questionRepository.getQuestionsByFromUserIdWithLimitAndOffset(fromUser.getId(),
                questionsPerPage, offset);
    }

    @Override
    public int getQuestionsByFromUserCount(User fromUser) throws UserIsNotAuthorizedException {
        if (fromUser == null) {
            throw new UserIsNotAuthorizedException();
        }
        return questionRepository.getQuestionsByFromUserCount(fromUser.getId());
    }
}
