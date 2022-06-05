var app = angular.module("Login", ['ngCookies']);

app.controller("LoginController", function ($scope, $http, $cookies) {
    $scope.user = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    };

    $scope.message = {
        message: ""
    };

    _pageLoad();

    $scope.login = function () {
        $http({
            method: 'POST',
            url: '/api/v1/user/login',
            data: angular.toJson($scope.user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function () {
                var remember = document.getElementById('remember').checked = true;
                if (remember) {
                    $cookies.put('remember', 'yes');
                    $cookies.put('email', $scope.user.email);
                } else {
                    $cookies.put('remember', 'no');
                    $cookies.remove('email');
                }
                window.location = "/main";
            },
            function (response) {
                $scope.message = response.data;
                alert($scope.message.message);
                _clearFormData();
            }
        );
    }

    function _clearFormData() {
        $scope.user.password = "";
    }

    function _pageLoad() {
        if ($cookies.get('remember') === 'yes') {
            $scope.user.email = $cookies.get('email');
            document.getElementById('remember').checked = true;
        }
    }
});