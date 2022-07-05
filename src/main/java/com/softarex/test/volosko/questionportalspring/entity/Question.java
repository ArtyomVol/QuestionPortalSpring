package com.softarex.test.volosko.questionportalspring.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "question")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "question_seq")
    @SequenceGenerator(name = "question_seq", sequenceName = "question_id_seq", allocationSize = 1)
    @Column(name = "id")
    @Setter(value = AccessLevel.PRIVATE)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user", nullable = false)
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "for_user", nullable = false)
    private User forUser;

    @Column(name = "question_text", nullable = false)
    private String questionText;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answer_type_id", nullable = false)
    private AnswerType answerType;

    @Column(name = "answer_options")
    private String answerOptions;

    @Column(name = "answer")
    private String answer;

    public Question(long id, User fromUser, User forUser, String questionText, AnswerType answerType,
                    String answerOptions, String answer) {
        this.id = id;
        this.fromUser = fromUser;
        this.forUser = forUser;
        this.questionText = questionText;
        this.answerType = answerType;
        this.answerOptions = answerOptions;
        this.answer = answer;
    }

    public Question(User fromUser, User forUser, String questionText, AnswerType answerType, String answerOptions,
                    String answer) {
        this.fromUser = fromUser;
        this.forUser = forUser;
        this.questionText = questionText;
        this.answerType = answerType;
        this.answerOptions = answerOptions;
        this.answer = answer;
    }

    public Question(Long id, User forUser, String questionText, AnswerType answerType, String answerOptions,
                    String answer) {
        this.id = id;
        this.forUser = forUser;
        this.questionText = questionText;
        this.answerType = answerType;
        this.answerOptions = answerOptions;
        this.answer = answer;
    }
}
