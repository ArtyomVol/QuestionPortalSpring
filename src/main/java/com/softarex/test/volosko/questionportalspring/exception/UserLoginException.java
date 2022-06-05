package com.softarex.test.volosko.questionportalspring.exception;

public class UserLoginException extends Exception{
    public UserLoginException(){
        super("Email or password entered incorrectly.");
    }

    public UserLoginException(String msg){
        super(msg);
    }
}
