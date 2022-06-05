package com.softarex.test.volosko.questionportalspring.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Message{
    String message;
    public Message(String message){
        this.message = message;
    }
}