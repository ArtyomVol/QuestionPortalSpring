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
  file [src/main/resources/application.properties](https://github.com/ArtyomVol/QuestionPortalSpring/blob/master/src/main/resources/application.properties)

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
  as [file](https://github.com/ArtyomVol/QuestionPortalSpring/blob/develop/src/main/java/com/softarex/test/volosko/questionportalspring/QuestionPortalSpringApplication.java)
  or com.softarex.test.volosko.questionportalspring.QuestionPortalSpringApplication
* And run
* Go to the url http://localhost:8081/#!/

___

## Short description of classes and methods

The server-side classes are divided into:

* config
    * WebSocketConfig - websocket configuration class with methods:
        * configureMessageBroker - configures message broker settings
        * registerStompEndpoints - registers a STOMP endpoint and maps it to a specific URL.
* constants
    * EmailConstants - class, that contains the constants needed to fill out the email before sending it.
* controller - controller classes, that process messages from the client and return the desired result.
    * AnswerTypeRestController - controller class, with method:
        * getAll() - receiving all types of responses (List<AnswerTypeDto>).
    * ErrorController - controller class, that sends error message if it occurs.
    * QuestionRestController - controller class, with methods:
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
    * UserRestController - controller class with methods:
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
* entity - entity classes
    * dto - dto classes for passing data between the server and client parts (class fields will be written in
      parentheses)
        * user - dto classes for user data
            * UserConfirmationCodeDto (email, newPassword, confirmationCode)
            * UserLoginDto (email, password)
            * UserOnlyEmailDto (email)
            * UserRegistrationDto (email, password, firstName, lastName, phoneNumber)
            * UserSessionDto (email, firstName, lastName)
            * UserUpdateDto (email, password, newPassword, firstName, lastName, phoneNumber)
        * AnswerTypeDto - (type)
        * EmailDto (emailTo, emailFrom, message, mailSubject) - this class also contains methods for preparing data for
          transmission by e-mail by using class SimpleMailMessage (registry, profile deleting and change password
          emails)
        * Message (message)
        * QuestionDto (id, fromUser, forUser, questionText, answerType, answerOptions, answer)
    * AnswerType - dao class, whose fields correspond to a table answer_type in the database.
    * Question - dao class, whose fields correspond to a table question in the database.
    * User - dao class, whose fields correspond to a table user in the database.
* exception - exception classes created for events in the application.
    * login
        * UserIsMissingException
        * UserLoginException
    * question
        * UserCanNotActionWithThisQuestionException
        * UserCanNotAddQuestionException
        * UserCanNotChangeQuestionException
        * UserCanNotDeleteQuestionException
    * registration
        * InvalidMailFormatException
        * UserAlreadyExistsException
        * UserRegistrationException
    * QuestionPortalException - main exception class, that extends RuntimeException.
    * UserChangeException (extends QuestionPortalException)
    * UserIsNotAuthorizedException (extends QuestionPortalException)
    * UserWrongPasswordException (extends UserChangeException)
    * WrongConfirmationCodeException (extends QuestionPortalException)
* mapper - mapper classes, that are designed to transform objects of dao classes into objects of dto classes and vice
  versa.
    * AnswerTypeMapper
    * QuestionMapper
    * UserMapper
* repository - repository classes, that are designed to send queries to the database and return the appropriate results.
  They contain default methods obtained by inheriting the CrudRepository class (Other methods are indicated in
  parentheses).
    * AnswerTypeRepository (search by type)
    * QuestionRepository (search for all questions, a certain number of questions starting from a certain number of
      them, by sender or recipient, deleting a question by its id and sender's id)
    * UserRepository (search by email, search for all users except the user with email)
* service - service classes, that executing business logic on the corresponding entity.
    * rest - intermediate classes between controllers and services.
        * AnswerTypeRestService
        * QuestionRestService
        * UserRestService
    * AnswerTypeService
    * QuestionService
    * UserService
* util
    * PasswordGenerator - class for generating random passwords
* QuestionPortalSpringApplication
