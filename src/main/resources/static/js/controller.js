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

    _pageLoad();

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
                    window.location = "/#!/login";
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
        if ($scope.user.firstName.length > 20) {
            errorMsg += "The length of the first name must be no more then 20 characters.\n";
        }
        if ($scope.user.lastName.length > 20) {
            errorMsg += "The length of the last name must be no more then 20 characters.\n";
        }
        var regNumber = new RegExp('^(\\+)?[0-9]+$');
        if ($scope.user.phoneNumber !== "" && !regNumber.test($scope.user.phoneNumber)){
            errorMsg += "The phone number must be consist of only numbers (or + at the beginning).\n";
        }
        else if ($scope.user.phoneNumber.length > 16) {
            errorMsg += "The length of the phone number must be no more then 16 characters.\n";
        }
        return errorMsg;
    }

    function _pageLoad() {
        $http({
            method: 'GET',
            url: '/api/v1/user/get-user-from-session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (response.data){
                    window.location = "/#!/edit_profile";
                }
            }
        );
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

    $scope.errorMessage = {
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
                window.location = "/#!/edit_profile";
            },
            function (response) {
                $scope.errorMessage = response.data;
                alert($scope.errorMessage.message);
                _clearFormData();
            }
        );
    }

    function _clearFormData() {
        $scope.user.password = "";
    }

    function _pageLoad() {
        $http({
            method: 'GET',
            url: '/api/v1/user/get-user-from-session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (response.data){
                    window.location = "/#!/edit_profile";
                }
                if ($cookies.get('remember') === 'yes') {
                    $scope.user.email = $cookies.get('email');
                    document.getElementById('remember').checked = true;
                }
            }
        );
    }
});

app.controller("EditProfileController", function ($scope, $http) {
    $scope.oldPassword = "";

    $scope.message = {
        message: ""
    };

    $scope.user = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    };

    _pageLoad();

    function _pageLoad() {
        $http({
            method: 'GET',
            url: '/api/v1/user/get-user-from-session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (!response.data){
                    window.location = "/#!/login";
                }
                $scope.user = response.data;
                $scope.user.password = "";
                $scope.oldPassword = "";
                var userFLName = "";
                userFLName = $scope.user.firstName + " " + $scope.user.lastName;
                if (userFLName === " ") {
                    userFLName = $scope.user.email;
                }
                document.getElementById('f_l_name').textContent = userFLName;
            }
        );
    }

    $scope.changeUser = function () {
        var errorMsg = checkData();
        if (errorMsg === "") {
            $http({
                method: 'POST',
                url: '/api/v1/user/check-user-password',
                data: angular.toJson($scope.oldPassword),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function () {
                    $http({
                        method: 'POST',
                        url: '/api/v1/user/change-user-data',
                        data: angular.toJson($scope.user),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(
                        function () {
                            _pageLoad();
                        },
                        function (response) {
                            $scope.message = response.data;
                            alert($scope.message.message);
                        }
                    );
                },
                function (response) {
                    $scope.message = response.data;
                    alert($scope.message.message);
                    _clearFormData();
                }
            );
        } else {
            alert(errorMsg);
        }
    }

    function checkData() {
        var errorMsg = "";
        if ($scope.user.firstName.length > 20) {
            errorMsg += "The length of the first name must be no more then 20 characters.\n";
        }
        if ($scope.user.lastName.length > 20) {
            errorMsg += "The length of the last name must be no more then 20 characters.\n";
        }
        if ($scope.user.email.length > 256){
            errorMsg += "The length of the email must be no more than 256 characters.\n";
        }
        var regNumber = new RegExp('^(\\+)?[0-9]+$');
        if ($scope.user.phoneNumber !== "" && !regNumber.test($scope.user.phoneNumber)){
            errorMsg += "The phone number must be consist of only numbers (or + at the beginning).\n";
        }
        else if ($scope.user.phoneNumber.length > 16) {
            errorMsg += "The length of the phone number must be no more then 16 characters.\n";
        }
        if (($scope.user.password.length !== 0) && ($scope.user.password.length < 8 || $scope.user.password.length > 32)) {
            errorMsg += "The length of the new password must be no less then 8 and no more then 32 characters.\n";
            _clearFormData();
        }
        return errorMsg;
    }

    $scope.logout = function () {
        $http({
            method: 'GET',
            url: '/api/v1/user/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function () {
                window.location = "/#!/login";
            }
        );
    }

    function _clearFormData() {
        $scope.user.password = "";
        $scope.oldPassword = "";
    }
});