app.controller("RegistrationController", function ($scope, $http) {
    $scope.confirmPassword = "";

    $scope.user = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    };

    pageLoad();

    $scope.createUser = function () {
        let errorMsg = checkData();
        if (errorMsg === "") {
            document.getElementById("sign_btn").disabled = "true";
            document.getElementById("loader").style.display = "block";
            $http({
                method: 'POST',
                url: '/api/v1/users/',
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
                    alertModify(response.data.message, "Error");
                }
            );
        } else {
            alertModify(errorMsg, "Error");
        }
    }

    function checkData() {
        let errorMsg = "";
        if ($scope.user.email.length > 29) {
            errorMsg += "The length of the email must be no more than 29 characters.\n";
        }
        if ($scope.user.password.length < 8 || $scope.user.password.length > 32) {
            errorMsg += "The length of the password must be no less then 8 and no more then 32 characters.\n"
            clearFormData();
        } else if ($scope.user.password !== $scope.confirmPassword) {
            errorMsg += "Passwords mismatch\n";
            clearFormData();
        }
        if ($scope.user.firstName.length + $scope.user.lastName.length > 28) {
            errorMsg += "The length of the first and last name together must be no more then 28 characters.\n";
        }
        if ($scope.user.firstName.length > 20) {
            errorMsg += "The length of the first name must be no more then 20 characters.\n";
        }
        if ($scope.user.lastName.length > 20) {
            errorMsg += "The length of the last name must be no more then 20 characters.\n";
        }
        let regNumber = new RegExp('^(\\+)?[0-9]+$');
        if ($scope.user.phoneNumber !== "" && !regNumber.test($scope.user.phoneNumber)) {
            errorMsg += "The phone number must be consist of only numbers (or + at the beginning).\n";
        } else if ($scope.user.phoneNumber.length > 16) {
            errorMsg += "The length of the phone number must be no more then 16 characters.\n";
        }
        return errorMsg;
    }

    function pageLoad() {
        $http({
            method: 'GET',
            url: '/api/v1/users/from/session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (response.data) {
                    window.location = "/#!/questions/your";
                }
            }
        );
    }

    function clearFormData() {
        $scope.user.password = "";
        $scope.confirmPassword = "";
    }
});