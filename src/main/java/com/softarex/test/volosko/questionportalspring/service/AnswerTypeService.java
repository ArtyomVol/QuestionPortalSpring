package com.softarex.test.volosko.questionportalspring.service;

import com.softarex.test.volosko.questionportalspring.entity.AnswerType;
import com.softarex.test.volosko.questionportalspring.entity.dto.AnswerTypeDto;
import com.softarex.test.volosko.questionportalspring.mapper.AnswerTypeMapper;
import com.softarex.test.volosko.questionportalspring.repository.AnswerTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnswerTypeService {
    private final AnswerTypeRepository answerTypeRepository;

    @Autowired
    public AnswerTypeService(AnswerTypeRepository answerTypeRepository) {
        this.answerTypeRepository = answerTypeRepository;
    }

    public List<AnswerTypeDto> getAllAnswerTypes() {
        List<AnswerType> answerTypesDao = (List<AnswerType>) answerTypeRepository.findAll();
        List<AnswerTypeDto> answerTypesDto = new ArrayList<>();
        for (AnswerType answerTypeDao : answerTypesDao) {
            answerTypesDto.add(AnswerTypeMapper.AnswerTypeEntityToDto(answerTypeDao));
        }
        return answerTypesDto;
    }

    public AnswerType getAnswerTypeByType(String type) {
        return answerTypeRepository.findByType(type);
    }
}
