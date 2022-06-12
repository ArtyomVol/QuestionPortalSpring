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
    }).when('/delete_profile', {
        templateUrl: '/template/delete_profile.html',
        controller: 'DeleteProfileController'
    }).otherwise({
        redirectTo: '/login',
        controller: 'LoginController',
        templateUrl: '/template/login.html',});
});