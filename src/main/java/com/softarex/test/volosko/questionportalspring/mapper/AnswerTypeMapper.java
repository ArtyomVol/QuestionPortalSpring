package com.softarex.test.volosko.questionportalspring.mapper;

import com.softarex.test.volosko.questionportalspring.entity.AnswerType;
import com.softarex.test.volosko.questionportalspring.entity.dto.AnswerTypeDto;

public class AnswerTypeMapper {
    public static AnswerTypeDto AnswerTypeEntityToDto(AnswerType answerType) {
        return new AnswerTypeDto(answerType.getType());
    }
}
