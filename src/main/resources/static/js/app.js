var app = angular.module('QuestionPortal', ['ngRoute', 'ngResource', 'ngCookies']);
app.config(function ($routeProvider) {
    $routeProvider.when('/registration', {
        templateUrl: '/template/registration.html',
        controller: 'RegistrationController'
    }).when('/login', {
        templateUrl: '/template/login.html',
        controller: 'LoginController'
    }).when('/profile/edit', {
        templateUrl: '/template/edit-profile.html',
        controller: 'EditProfileController'
    }).when('/profile/delete', {
        templateUrl: '/template/delete-profile.html',
        controller: 'DeleteProfileController'
    }).when('/questions/your', {
        templateUrl: '/template/your-questions.html',
        controller: 'YourQuestionsController'
    }).when('/questions/answer', {
        templateUrl: '/template/answer-the-question.html',
        controller: 'AnswerTheQuestionController'
    }).when('/forget-password', {
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