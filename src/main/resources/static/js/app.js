var app = angular.module('QuestionPortal', ['ngRoute', 'ngResource', 'ngCookies']);
app.config(function ($routeProvider) {
    $routeProvider.when('/registration', {
        templateUrl: '/template/registration.html',
        controller: 'RegistrationController'
    }).when('/login', {
        templateUrl: '/template/login.html',
        controller: 'LoginController'
    }).when('/edit_profile', {
        templateUrl: '/template/edit_profile.html',
        controller: 'EditProfileController'
    }).otherwise({
        redirectTo: '/login',
        controller: 'LoginController',
        templateUrl: '/template/login.html',});
});