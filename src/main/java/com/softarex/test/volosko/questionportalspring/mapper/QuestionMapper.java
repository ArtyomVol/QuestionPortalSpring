package com.softarex.test.volosko.questionportalspring.mapper;

import com.softarex.test.volosko.questionportalspring.entity.AnswerType;
import com.softarex.test.volosko.questionportalspring.entity.Question;
import com.softarex.test.volosko.questionportalspring.entity.User;
import com.softarex.test.volosko.questionportalspring.entity.dto.QuestionDto;
import com.softarex.test.volosko.questionportalspring.service.AnswerTypeService;
import com.softarex.test.volosko.questionportalspring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {
    private static AnswerTypeService answerTypeService;
    private static UserService userService;

    @Autowired
    public QuestionMapper(AnswerTypeService answerTypeService, UserService userService) {
        QuestionMapper.answerTypeService = answerTypeService;
        QuestionMapper.userService = userService;
    }

    public static Question questionDtoToEntityWithId(QuestionDto questionDto) {
        AnswerType answerType = answerTypeService.getAnswerTypeByType(questionDto.getAnswerType().getType());
        User fromUser = userService.getUserByEmail(questionDto.getFromUser().getEmail());
        User forUser = userService.getUserByEmail(questionDto.getForUser().getEmail());
        return new Question(questionDto.getId(), fromUser, forUser, questionDto.getQuestionText(), answerType,
                questionDto.getAnswerOptions(), questionDto.getAnswer());
    }

    public static Question questionDtoToEntityWithoutId(QuestionDto questionDto) {
        AnswerType answerType = answerTypeService.getAnswerTypeByType(questionDto.getAnswerType().getType());
        User fromUser = userService.getUserByEmail(questionDto.getFromUser().getEmail());
        User forUser = userService.getUserByEmail(questionDto.getForUser().getEmail());
        return new Question(fromUser, forUser, questionDto.getQuestionText(), answerType,
                questionDto.getAnswerOptions(), questionDto.getAnswer());
    }

    public static QuestionDto questionEntityToDto(Question question) {
        return new QuestionDto(
                question.getId(),
                UserMapper.userEntityToUserSessionDto(question.getFromUser()),
                UserMapper.userEntityToUserSessionDto(question.getForUser()),
                question.getQuestionText(),
                AnswerTypeMapper.AnswerTypeEntityToDto(question.getAnswerType()),
                question.getAnswerOptions(),
                question.getAnswer());
    }
}
