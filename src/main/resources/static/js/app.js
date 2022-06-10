var app = angular.module('QuestionPortal', ['ngRoute', 'ngResource', 'ngCookies']);
app.config(function ($routeProvider) {
    $routeProvider.when('/registration', {
        templateUrl: '/template/registration.html',
        controller: 'RegistrationController'
    }).when('/login', {
        templateUrl: '/template/login.html',
        controller: 'LoginController'
    }).when('/main', {
        templateUrl: '/template/main.html',
        controller: 'MainController'
    }).otherwise({
        redirectTo: '/login',
        controller: 'LoginController',
        templateUrl: '/template/login.html',});
});