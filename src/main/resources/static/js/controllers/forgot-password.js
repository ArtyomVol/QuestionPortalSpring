app.controller("ForgotPasswordController", function ($scope, $http) {

    $scope.user = {
        email: "",
        newPassword: "",
        confirmationCode: ""
    };

    $scope.additionalData = {
        confirmPassword: ""
    };

    $scope.mailIsSend = false;

    $scope.message = {
        message: ""
    };

    pageLoad();

    $scope.sendConfirmationCode = function () {
        document.getElementById("btn").disabled = "true";
        document.getElementById("loader").style.display = "block";
        $http({
            method: 'GET',
            url: '/api/v1/users/confirmation-code?email='+ $scope.user.email,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                alert(response.data.message);
                $scope.mailIsSend = true;
                document.getElementById("btn").removeAttribute("disabled");
                document.getElementById("loader").style.display = "none";
            },
            function (response) {
                alert(response.data.message);
                document.getElementById("btn").removeAttribute("disabled");
                document.getElementById("loader").style.display = "none";
            }
        );
    }

    $scope.changePassword = function () {
        let errorMsg = checkData();
        if (errorMsg === "") {
            $http({
                method: 'POST',
                url: '/api/v1/users/change-password',
                data: angular.toJson($scope.user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    alert(response.data.message);
                    window.location = "/#!/login";
                },
                function (response) {
                    alert(response.data.message);
                    $scope.user.confirmationCode = "";
                    clearFormData();
                }
            );
        }
        else {
            alert(errorMsg);
        }
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

    function checkData() {
        let errorMsg = "";
        if ($scope.user.newPassword.length < 8 || $scope.user.newPassword.length > 32) {
            errorMsg += "The length of the password must be no less then 8 and no more then 32 characters.\n"
            clearFormData();
        } else if ($scope.user.newPassword !== $scope.additionalData.confirmPassword) {
            errorMsg += "Passwords mismatch\n";
            clearFormData();
        }
        return errorMsg;
    }

    function clearFormData() {
        $scope.user.newPassword = "";
        $scope.additionalData.confirmPassword = "";
    }
});