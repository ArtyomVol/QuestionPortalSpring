app.controller("EditProfileController", function ($scope, $http) {
    $scope.user = {
        email: "",
        password: "",
        newPassword: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    };

    pageLoad();

    function pageLoad() {
        $http({
            method: 'GET',
            url: '/api/v1/users/get-user-from-session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (!response.data) {
                    window.location = "/#!/login";
                }
                $scope.user = response.data;
                var userFLName = $scope.user.firstName + " " + $scope.user.lastName;
                if (userFLName === " ") {
                    userFLName = $scope.user.email;
                }
                document.getElementById('f_l_name').textContent = userFLName;
            }
        );
    }

    $scope.changeUser = function () {
        let errorMsg = checkData();
        if (errorMsg === "") {
            $http({
                method: 'PUT',
                url: '/api/v1/users/',
                data: angular.toJson($scope.user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function () {
                    pageLoad();
                },
                function (response) {
                    alert(response.data.message);
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
        if ($scope.user.email.length > 36) {
            errorMsg += "The length of the email must be no more than 36 characters.\n";
        }
        var regNumber = new RegExp('^(\\+)?[0-9]+$');
        if ($scope.user.phoneNumber !== "" && !regNumber.test($scope.user.phoneNumber)) {
            errorMsg += "The phone number must be consist of only numbers (or + at the beginning).\n";
        } else if ($scope.user.phoneNumber.length > 16) {
            errorMsg += "The length of the phone number must be no more then 16 characters.\n";
        }
        if (($scope.user.newPassword.length !== 0) && ($scope.user.newPassword.length < 8 ||
            $scope.user.newPassword.length > 32)) {
            errorMsg += "The length of the new password must be no less then 8 and no more then 32 characters.\n";
            clearFormData();
        }
        return errorMsg;
    }

    $scope.logout = function () {
        $http({
            method: 'GET',
            url: '/api/v1/users/logout',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function () {
                window.location = "/#!/login";
            }
        );
    }

    function clearFormData() {
        $scope.user.password = "";
        $scope.oldPassword = "";
    }
});