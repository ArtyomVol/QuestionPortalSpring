app.controller("DeleteProfileController", function ($scope, $http) {
    $scope.password = "";

    $scope.message = {
        message: ""
    };

    pageLoad();

    function pageLoad() {
        $http({
            method: 'GET',
            url: '/api/v1/users/from/session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (!response.data) {
                    window.location = "/#!/login";
                }
                let user = response.data;
                let userFLName = user.firstName + " " + user.lastName;
                if (userFLName === " ") {
                    userFLName = user.email;
                }
                document.getElementById('f_l_name').textContent = userFLName;
            }
        );
    }

    $scope.deleteUser = function () {
        document.getElementById("delete_btn").disabled = "true";
        document.getElementById("loader").style.display = "block";
        $http({
            method: 'DELETE',
            url: '/api/v1/users/',
            data: angular.toJson($scope.password),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function () {
                window.location = "/#!/login";
            },
            function (response) {
                document.getElementById("delete_btn").removeAttribute("disabled");
                document.getElementById("loader").style.display = "none";
                $scope.message = response.data;
                alert($scope.message.message);
                clearFormData();
            }
        );
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
        $scope.password = "";
    }
});