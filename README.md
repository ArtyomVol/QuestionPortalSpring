# Question portal (Spring)
___

## Used tech stack

* Java 8
* Maven
* Spring boot + Spring MVC
* JPA, Spring data, Hibernate
* DB: PostgreSQL
* AngularJS
* Twitter Bootstrap
* WebSockets
* IDEA

---

## Information about application

This web application is oriented to GoogleChrome.
This web application consist of 6 pages: LogIn, SignUp, EditProfile, DeleteProfile, YourQuestions and AnswerTheQuestions.
There are email notification after registration and profile deletion.
This web application is an example of a question system, where you can ask someone questions and provide answers to the questions, asked of you.

___

## How to run

### First of all, you can just open [Heroku](https://question-portal-spring.herokuapp.com/) =)

To run the application, you need to:
* Open GitBush in necessary folder
* Write this command (or copy and click rmb and choose 'paste')
```properties
git clone https://github.com/ArtyomVol/QuestionPortalSpring
```
* Change data in a file [src/main/resources/application.properties](https://github.com/ArtyomVol/QuestionPortalSpring/blob/master/src/main/resources/application.properties)
```properties
# if the port is busy/in use, change it
server.port=8081  
# if you have a different address/name for the database
# WARNING!!! The database must be empty, 
# or at least not include tables user, answer_type and question
spring.datasource.url=jdbc:postgresql://localhost:5432/QuestionsPortal
# and change username and password
spring.datasource.username=postgres
spring.datasource.password=01112001
```
* Load the project in IntelliJ IDEA
* Wait...
* After indexing click 'Add Configuration...' --> 'Add new...' --> 'Spring Boot'.
* Give the name to your configuration
* Select Main class as [file](https://github.com/ArtyomVol/QuestionPortalSpring/blob/develop/src/main/java/com/softarex/test/volosko/questionportalspring/QuestionPortalSpringApplication.java) or com.softarex.test.volosko.questionportalspring.QuestionPortalSpringApplication
* And run
* Go to the url http://localhost:8081/#!/
