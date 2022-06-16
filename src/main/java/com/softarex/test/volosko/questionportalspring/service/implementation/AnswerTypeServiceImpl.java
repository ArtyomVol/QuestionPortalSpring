package com.softarex.test.volosko.questionportalspring.service.implementation;

import com.softarex.test.volosko.questionportalspring.entity.AnswerType;
import com.softarex.test.volosko.questionportalspring.repository.AnswerTypeRepository;
import com.softarex.test.volosko.questionportalspring.service.AnswerTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerTypeServiceImpl implements AnswerTypeService {
    private final AnswerTypeRepository answerTypeRepository;

    @Autowired
    public AnswerTypeServiceImpl(AnswerTypeRepository answerTypeRepository) {
        this.answerTypeRepository = answerTypeRepository;
    }


    @Override
    public List<AnswerType> getAllAnswerTypes() {
        return (List<AnswerType>) answerTypeRepository.findAll();
    }
}
