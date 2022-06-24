package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.dto.QuestionDto;
import com.softarex.test.volosko.questionportalspring.exception.UserIsNotAuthorizedException;
import com.softarex.test.volosko.questionportalspring.mapper.QuestionMapper;
import com.softarex.test.volosko.questionportalspring.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    @Autowired
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public List<QuestionDto> getQuestionsByFromUser(User fromUser) {
        if (fromUser == null) {
            throw new UserIsNotAuthorizedException();
        }
        return convertQuestionListToQuestionDtoList(questionRepository.getQuestionsByFromUser(fromUser));
    }

    public void createQuestion(QuestionDto questionDto) {
        questionRepository.save(QuestionMapper.questionDtoToEntityWithoutId(questionDto));
    }

    public void deleteQuestionById(long id) {
        questionRepository.deleteById(id);
    }

    public void editQuestion(QuestionDto questionDto) {
        Question question = QuestionMapper.questionDtoToEntityWithId(questionDto);
        questionRepository.save(question);
    }

    public List<QuestionDto> getQuestionsByFromUserWithPagination(User fromUser, int questionsPerPage, int pageNum) {
        List<Question> questionsDao;
        int offset;

        if (fromUser == null) {
            throw new UserIsNotAuthorizedException();
        }
        offset = (pageNum - 1) * questionsPerPage;
        questionsDao = questionRepository.getQuestionsByFromUserIdWithLimitAndOffset(fromUser.getId(),
                questionsPerPage, offset);
        return convertQuestionListToQuestionDtoList(questionsDao);
    }

    public int getQuestionsByFromUserCount(User fromUser) {
        if (fromUser == null) {
            throw new UserIsNotAuthorizedException();
        }
        return questionRepository.getQuestionsByFromUserCount(fromUser.getId());
    }

    private List<QuestionDto> convertQuestionListToQuestionDtoList(List<Question> questions) {
        List<QuestionDto> questionsDto = new ArrayList<>();
        for (Question questionDao : questions) {
            questionsDto.add(QuestionMapper.questionEntityToDto(questionDao));
        }
        return questionsDto;
    }
}
