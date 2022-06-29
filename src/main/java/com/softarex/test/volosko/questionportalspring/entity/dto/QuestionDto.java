package com.softarex.test.volosko.questionportalspring.entity.dto;

import com.softarex.test.volosko.questionportalspring.entity.dto.user.UserSessionDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QuestionDto {
    private Long id;
    private UserSessionDto fromUser;
    private UserSessionDto forUser;
    private String questionText;
    private AnswerTypeDto answerType;
    private String answerOptions;
    private String answer;
}
