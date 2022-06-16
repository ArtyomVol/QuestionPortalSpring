package com.softarex.test.volosko.questionportalspring.entity;

import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="answer_type")
public class AnswerType {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "answer_type_seq")
    @SequenceGenerator(name = "answer_type_seq", sequenceName = "answer_type_id_seq", allocationSize = 1)
    @Column(name = "id")
    @Setter(value = AccessLevel.PRIVATE)
    private Long id;

    @Column(name = "type", nullable = false)
    private String type;
}
