app.controller("LoginController", function ($scope, $http, $cookies) {

    $scope.user = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    };

    $scope.errorMessage = {
        message: ""
    };

    pageLoad();

    $scope.login = function () {
        $http({
            method: 'POST',
            url: '/api/v1/users/login',
            data: angular.toJson($scope.user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function () {
                var remember = document.getElementById('remember').checked === true;
                if (remember) {
                    $cookies.put('remember', 'yes');
                    $cookies.put('email', $scope.user.email);
                } else {
                    $cookies.put('remember', 'no');
                    $cookies.remove('email');
                }
                window.location = "/#!/your_questions";
            },
            function (response) {
                $scope.errorMessage = response.data;
                alert($scope.errorMessage.message);
                clearFormData();
            }
        );
    }

    function clearFormData() {
        $scope.user.password = "";
    }

    function pageLoad() {
        $http({
            method: 'GET',
            url: '/api/v1/users/get-user-from-session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (response.data) {
                    window.location = "/#!/your_questions";
                }
                if ($cookies.get('remember') === 'yes') {
                    $scope.user.email = $cookies.get('email');
                    document.getElementById('remember').checked = true;
                }
            }
        );
    }
});