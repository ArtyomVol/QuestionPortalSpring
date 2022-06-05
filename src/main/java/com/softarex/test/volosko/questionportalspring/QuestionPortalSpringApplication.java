package com.softarex.test.volosko.questionportalspring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan(basePackages = "com.softarex.test.volosko.questionportalspring")
public class QuestionPortalSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuestionPortalSpringApplication.class, args);
    }

}
