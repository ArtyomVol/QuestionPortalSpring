FROM openjdk:8
EXPOSE 8080
WORKDIR /question-portal-spring/application
COPY /target/QuestionPortalSpring-0.0.1-SNAPSHOT.jar /question-portal-spring/application

ENTRYPOINT ["java","-jar","QuestionPortalSpring-0.0.1-SNAPSHOT.jar"]