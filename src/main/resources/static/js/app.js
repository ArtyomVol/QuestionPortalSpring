var app = angular.module('QuestionPortal', ['ngRoute', 'ngResource', 'ngCookies']);
app.config(function ($routeProvider) {
    $routeProvider.when('/registration', {
        templateUrl: '/template/registration.html',
        controller: 'RegistrationController'
    }).when('/login', {
        templateUrl: '/template/login.html',
        controller: 'LoginController'
    }).when('/edit_profile', {
        templateUrl: '/template/edit-profile.html',
        controller: 'EditProfileController'
    }).when('/delete_profile', {
        templateUrl: '/template/delete-profile.html',
        controller: 'DeleteProfileController'
    }).when('/your_questions', {
        templateUrl: '/template/your-questions.html',
        controller: 'YourQuestionsController'
    }).when('/answer_the_question', {
        templateUrl: '/template/answer-the-question.html',
        controller: 'AnswerTheQuestionController'
    }).otherwise({
        redirectTo: '/login',
        controller: 'LoginController',
        templateUrl: '/template/login.html',});
});

app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        if(typeof $rootScope.stompClient !== 'undefined' && $rootScope.stompClient !== null) {
            $rootScope.stompClient.disconnect();
            $rootScope.stompClient = null;
        }
    })
})