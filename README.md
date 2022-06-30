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

This web application is oriented to GoogleChrome. This web application consist of 6 pages: LogIn, SignUp, EditProfile,
DeleteProfile, YourQuestions and AnswerTheQuestions. There are email notification after registration and profile
deletion. This web application is an example of a question system, where you can ask someone questions and provide
answers to the questions, asked of you.

___

## How to run

### First, you can just open [Heroku](https://question-portal-spring.herokuapp.com/) =)

To run the application, you need to:

* Open GitBush in necessary folder
* Write this command (or copy and click rmb and choose 'paste')

```
git clone https://github.com/ArtyomVol/QuestionPortalSpring
```

* Change data in a
  file [src/main/resources/application.properties](src/main/resources/application.properties)

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
* Select Main class
  as [file](src/main/java/com/softarex/test/volosko/questionportalspring/QuestionPortalSpringApplication.java)
  or com.softarex.test.volosko.questionportalspring.QuestionPortalSpringApplication
* And run
* Go to the url http://localhost:8081/#!/

___

## Short description of classes and methods

The server-side classes are divided into:

* [config](src/main/java/com/softarex/test/volosko/questionportalspring/config)
    * [WebSocketConfig](src/main/java/com/softarex/test/volosko/questionportalspring/config/WebSocketConfig.java) - 
websocket configuration class with methods:
        * configureMessageBroker - configures message broker settings
        * registerStompEndpoints - registers a STOMP endpoint and maps it to a specific URL.
* [constants](src/main/java/com/softarex/test/volosko/questionportalspring/constants)
    * [EmailConstants](src/main/java/com/softarex/test/volosko/questionportalspring/constants/EmailConstants.java) - 
class, that contains the constants needed to fill out the email before sending it.
* [controller](src/main/java/com/softarex/test/volosko/questionportalspring/controller) - controller classes, that 
process messages from the client and return the desired result.
    * [AnswerTypeRestController](src/main/java/com/softarex/test/volosko/questionportalspring/controller/AnswerTypeRestController.java) - 
controller class, with method:
        * getAll() - receiving all types of responses (List<AnswerTypeDto>).
    * [ErrorController](src/main/java/com/softarex/test/volosko/questionportalspring/controller/ErrorController.java) - 
controller class, that sends error message if it occurs.
    * [QuestionRestController](src/main/java/com/softarex/test/volosko/questionportalspring/controller/QuestionRestController.java) - 
controller class, with methods:
        * getAllQuestionsFromSessionUser(HttpServletRequest request) - getting all questions asked by an authenticated
          user
          (List<QuestionDto>).
        * getAllQuestionsForSessionUser(HttpServletRequest request) - getting all questions asked of an authenticated
          user (List<QuestionDto>).
        * getQuestionsFromSessionUser(int questionsPerPage, int pageNum, HttpServletRequest request) - getting questions
          asked by an authenticated user by selected pageNum and questionsPerPage (List<QuestionDto>).
        * getQuestionsForSessionUser(int questionsPerPage, int pageNum, HttpServletRequest request) - getting all
          questions asked of an authenticated user by selected pageNum and questionsPerPage (List<QuestionDto>).
        * getCountOfQuestionsFromSessionUser(HttpServletRequest request) - getting count of questions asked by an
          authenticated user (Integer).
        * getCountOfQuestionsForSessionUser(HttpServletRequest request) - getting count of questions asked of an
          authenticated user (Integer).
        * createQuestion(QuestionDto question, HttpServletRequest request) - create question with checking
          correspondence between the authenticated user and the user who asked question (Message).
        * deleteQuestion(long id, HttpServletRequest request) - delete question by id with checking correspondence
          between the authenticated user and the user who asked question (Message).
        * editQuestion(QuestionDto question, HttpServletRequest request) - edit question with checking correspondence
          between the authenticated user and the user who asked question (Message).
        * answerQuestion(QuestionDto question, HttpServletRequest request) - add answer to question with checking
          correspondence between the authenticated user and the user who asked question (Message).
        * reportQuestionHasBeenAnswered(Message userEmailWhoseQuestionWasAnswered) - method, a method that receives the
          email of the user whose question was answered, and it is sent to all users whose websocket is listening to see
          if anyone has answered the question (Message).
        * reportQuestionHasBeenChanged(Message userEmailWhoseQuestionWasAnswered) - method that receives the email of
          the user whose question was asked/changed/deleted, and it is sent to all users whose websocket is listening,
          whether someone asked/changed/deleted the question (Message).
    * [UserRestController](src/main/java/com/softarex/test/volosko/questionportalspring/controller/UserRestController.java) - 
controller class with methods:
        * signIn(UserRegistrationDto user) - adding user to database and send message to email (Message).
        * logIn(UserLoginDto userData, HttpServletRequest request) - authenticate user and add to session (Message).
        * changeUserData(UserUpdateDto userUpdateDto, HttpServletRequest request) - change data of user (Message).
        * deleteUser(String password, HttpServletRequest request) - delete user and send message to email (Message).
        * logOut(HttpServletRequest request) - remove user from session (Message).
        * getUserFromSession(HttpServletRequest request) - get user info from session (UserSessionDto).
        * getAllOtherUsers(HttpServletRequest request) - get all other users email to select a recipient in a combobox
          when adding/changing a question
        * sendConfirmationCode(String email, HttpServletRequest request) - send message to email (Message).
        * changePassword(UserConfirmationCodeDto user, HttpServletRequest request) - change password of user
          (Message).
* [entity](src/main/java/com/softarex/test/volosko/questionportalspring/entity) - entity classes
    * [dto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto) - dto classes for passing data 
between the server and client parts (class fields will be written in
      parentheses)
        * [user](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/user) - dto classes for user 
    data
            * [UserConfirmationCodeDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/user/UserConfirmationCodeDto.java)
        (email, newPassword, confirmationCode)
            * [UserLoginDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/user/UserLoginDto.java) 
        (email, password)
            * [UserOnlyEmailDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/user/UserOnlyEmailDto.java) 
        (email)
            * [UserRegistrationDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/user/UserRegistrationDto.java) 
        (email, password, firstName, lastName, phoneNumber)
            * [UserSessionDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/user/UserSessionDto.java)
        (email, firstName, lastName, phoneNumber)
            * [UserUpdateDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/user/UserUpdateDto.java)
        (email, password, newPassword, firstName, lastName, phoneNumber)
        * [AnswerTypeDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/AnswerTypeDto.java) - 
(type)
        * [EmailDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/EmailDto.java) (emailTo, 
    emailFrom, message, mailSubject) - this class also contains methods for preparing data for transmission by e-mail 
    by using class SimpleMailMessage (registry, profile deleting and change password emails)
        * [Message](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/Message.java) (message)
        * [QuestionDto](src/main/java/com/softarex/test/volosko/questionportalspring/entity/dto/QuestionDto.java) (id, 
    fromUser, forUser, questionText, answerType, answerOptions, answer)
    * [AnswerType](src/main/java/com/softarex/test/volosko/questionportalspring/entity/AnswerType.java) - dao class, 
whose fields correspond to a table answer_type in the database.
    * [Question](src/main/java/com/softarex/test/volosko/questionportalspring/entity/Question.java) - dao class, whose 
fields correspond to a table question in the database.
    * [User](src/main/java/com/softarex/test/volosko/questionportalspring/entity/User.java) - dao class, whose fields
correspond to a table user in the database.
* [exception](src/main/java/com/softarex/test/volosko/questionportalspring/exception) - exception classes created for 
events in the application.
    * [login](src/main/java/com/softarex/test/volosko/questionportalspring/exception/login)
        * [UserIsMissingException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/login/UserIsMissingException.java)
        * [UserLoginException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/login/UserLoginException.java)
    * [question](src/main/java/com/softarex/test/volosko/questionportalspring/exception/question)
        * [UserCanNotActionWithThisQuestionException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/question/UserCanNotActionWithThisQuestionException.java)
        * [UserCanNotAddQuestionException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/question/UserCanNotAddQuestionException.java)
        * [UserCanNotChangeQuestionException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/question/UserCanNotChangeQuestionException.java)
        * [UserCanNotDeleteQuestionException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/question/UserCanNotDeleteQuestionException.java)
    * [registration](src/main/java/com/softarex/test/volosko/questionportalspring/exception/registration)
        * [InvalidMailFormatException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/registration/InvalidMailFormatException.java)
        * [UserAlreadyExistsException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/registration/UserAlreadyExistsException.java)
        * [UserRegistrationException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/registration/UserRegistrationException.java)
    * [QuestionPortalException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/QuestionPortalException.java) - 
main exception class, that extends RuntimeException.
    * [UserChangeException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/UserChangeException.java)
    * [UserIsNotAuthorizedException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/UserIsNotAuthorizedException.java)
    * [UserWrongPasswordException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/UserWrongPasswordException.java)
    * [WrongConfirmationCodeException](src/main/java/com/softarex/test/volosko/questionportalspring/exception/WrongConfirmationCodeException.java)
* [mapper](src/main/java/com/softarex/test/volosko/questionportalspring/mapper) - mapper classes, that are designed to 
transform objects of dao classes into objects of dto classes and vice versa.
    * [AnswerTypeMapper](src/main/java/com/softarex/test/volosko/questionportalspring/mapper/AnswerTypeMapper.java)
    * [QuestionMapper](src/main/java/com/softarex/test/volosko/questionportalspring/mapper/QuestionMapper.java)
    * [UserMapper](src/main/java/com/softarex/test/volosko/questionportalspring/mapper/UserMapper.java)
* [repository](src/main/java/com/softarex/test/volosko/questionportalspring/repository) - repository classes, that are 
designed to send queries to the database and return the appropriate results. They contain default methods obtained by 
inheriting the CrudRepository class (Other methods are indicated in parentheses).
    * [AnswerTypeRepository](src/main/java/com/softarex/test/volosko/questionportalspring/repository/AnswerTypeRepository.java) 
(search by type)
    * [QuestionRepository](src/main/java/com/softarex/test/volosko/questionportalspring/repository/QuestionRepository.java) 
(search for all questions, a certain number of questions starting from a certain number of them, by sender or recipient,
deleting a question by its id and sender's id)
    * [UserRepository](src/main/java/com/softarex/test/volosko/questionportalspring/repository/UserRepository.java) 
(search by email, search for all users except the user with email)
* [service](src/main/java/com/softarex/test/volosko/questionportalspring/service) - service classes, that executing 
business logic on the corresponding entity.
    * [rest](src/main/java/com/softarex/test/volosko/questionportalspring/service/rest) - intermediate classes between
controllers and services.
        * [AnswerTypeRestService](src/main/java/com/softarex/test/volosko/questionportalspring/service/rest/AnswerTypeRestService.java)
        * [QuestionRestService](src/main/java/com/softarex/test/volosko/questionportalspring/service/rest/QuestionRestService.java)
        * [UserRestService](src/main/java/com/softarex/test/volosko/questionportalspring/service/rest/UserRestService.java)
    * [AnswerTypeService](src/main/java/com/softarex/test/volosko/questionportalspring/service/AnswerTypeService.java)
    * [QuestionService](src/main/java/com/softarex/test/volosko/questionportalspring/service/QuestionService.java)
    * [UserService](src/main/java/com/softarex/test/volosko/questionportalspring/service/UserService.java)
* [util](src/main/java/com/softarex/test/volosko/questionportalspring/util)
    * [PasswordGenerator](src/main/java/com/softarex/test/volosko/questionportalspring/util/PasswordGenerator.java) - 
class for generating random passwords
* [QuestionPortalSpringApplication](src/main/java/com/softarex/test/volosko/questionportalspring/QuestionPortalSpringApplication.java) -
Class to bootstrap and run a Spring application
