app.controller("RegistrationController", function ($scope, $http) {
    $scope.confirmPassword = "";

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

    $scope.createUser = function () {
        var errorMsg = checkData();
        if (errorMsg === "") {
            document.getElementById("sign_btn").disabled="true";
            document.getElementById("loader").style.display = "block";
            $http({
                method: 'POST',
                url: '/api/v1/user/create',
                data: angular.toJson($scope.user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function () {
                    window.location = "/login";
                },
                function (response) {
                    document.getElementById("sign_btn").removeAttribute("disabled");
                    document.getElementById("loader").style.display = "none";
                    $scope.message = response.data;
                    alert($scope.message.message);
                }
            );
        } else {
            alert(errorMsg);
        }
    }

    function checkData() {
        var errorMsg = "";
        if ($scope.user.email.length > 256){
            errorMsg += "The length of the email must be no more than 256 characters.\n";
        }
        if ($scope.user.password.length < 8 || $scope.user.password.length > 32) {
            errorMsg += "The length of the password must be no less then 8 and no more then 32 characters.\n"
            _clearFormData();
        }
        else if ($scope.user.password !== $scope.confirmPassword) {
            errorMsg += "Passwords mismatch\n";
            _clearFormData();
        }
        if ($scope.user.firstName.length > 30) {
            errorMsg += "The length of the first name must be no more then 30 characters.\n";
        }
        if ($scope.user.lastName.length > 30) {
            errorMsg += "The length of the last name must be no more then 30 characters.\n";
        }
        var regNumber = new RegExp('^[0-9]+$');
        if ($scope.user.phoneNumber !== "" && !regNumber.test($scope.user.phoneNumber)){
            errorMsg += "The phone number must be consist of only numbers.\n";
        }
        else if ($scope.user.phoneNumber.length > 16) {
            errorMsg += "The length of the phone number must be no more then 16 characters.\n";
        }
        return errorMsg;
    }

    function _clearFormData() {
        $scope.user.password = "";
        $scope.confirmPassword = "";
    }
});

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
                window.location = "/#!/main";
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

app.controller("MainController", function ($scope, $http) {

});