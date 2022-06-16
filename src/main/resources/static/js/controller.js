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
            document.getElementById("sign_btn").disabled = "true";
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
        if ($scope.user.email.length > 36) {
            errorMsg += "The length of the email must be no more than 36 characters.\n";
        }
        if ($scope.user.password.length < 8 || $scope.user.password.length > 32) {
            errorMsg += "The length of the password must be no less then 8 and no more then 32 characters.\n"
            _clearFormData();
        } else if ($scope.user.password !== $scope.confirmPassword) {
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
        if ($scope.user.phoneNumber !== "" && !regNumber.test($scope.user.phoneNumber)) {
            errorMsg += "The phone number must be consist of only numbers (or + at the beginning).\n";
        } else if ($scope.user.phoneNumber.length > 16) {
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
                if (response.data) {
                    window.location = "/#!/your_questions";
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
                if (!response.data) {
                    window.location = "/#!/login";
                }
                $scope.user = response.data;
                $scope.user.password = "";
                $scope.oldPassword = "";
                var userFLName = $scope.user.firstName + " " + $scope.user.lastName;
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
                url: '/api/v1/user/check-password',
                data: angular.toJson($scope.oldPassword),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function () {
                    $http({
                        method: 'POST',
                        url: '/api/v1/user/change-data',
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
        if ($scope.user.email.length > 36) {
            errorMsg += "The length of the email must be no more than 36 characters.\n";
        }
        var regNumber = new RegExp('^(\\+)?[0-9]+$');
        if ($scope.user.phoneNumber !== "" && !regNumber.test($scope.user.phoneNumber)) {
            errorMsg += "The phone number must be consist of only numbers (or + at the beginning).\n";
        } else if ($scope.user.phoneNumber.length > 16) {
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

app.controller("DeleteProfileController", function ($scope, $http) {
    $scope.password = "";

    $scope.message = {
        message: ""
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
                if (!response.data) {
                    window.location = "/#!/login";
                }
                var user = response.data;
                var userFLName = user.firstName + " " + user.lastName;
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
            method: 'POST',
            url: '/api/v1/user/delete',
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
                _clearFormData();
            }
        );
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
        $scope.password = "";
    }
});

app.controller("YourQuestionsController", function ($scope, $http) {
    $scope.email = "";
    $scope.forUserPoints = "";

    $scope.message = {
        message: ""
    };

    $scope.questions = [];
    $scope.answerTypes = [];
    $scope.otherUsers = [];

    $scope.selectedUserEmail = "";
    $scope.selectedAnswerType = "";
    $scope.question = "";
    $scope.options = "";

    _pageLoad();

    function _pageLoad() {
        _get_user_from_session();
        _get_questions();
        _get_answer_types();
        _get_all_other_users();
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

    $scope.replace_selected_user_email = function (selectedUserEmail){
        let current_text = document.getElementById("forUser");
        let new_text = document.getElementById(selectedUserEmail);
        $scope.selectedUserEmail = selectedUserEmail;
        current_text.style.fontSize = new_text.style.fontSize;
        current_text.style.paddingRight = new_text.style.paddingRight;
    }

    $scope.replace_selected_answer_type = function (selectedAnswerType){
        let current_text = document.getElementById("answerType");
        let new_text = document.getElementById(selectedAnswerType);
        $scope.selectedAnswerType = selectedAnswerType;
        current_text.style.fontSize = new_text.style.fontSize;
        current_text.style.paddingRight = new_text.style.paddingRight;
    }

    $scope.adjust_other_users_and_answer_types_text = function () {
        adjust_other_users_text();
        adjust_answer_type_text();
        let _text_size_test_parent = document.getElementById("body-container-fluid");
        _text_size_test_parent.removeChild(_text_size_test);
    }

    function adjust_answer_type_text(){
        let _text_size_test = document.getElementById("text-size-test");
        angular.forEach($scope.answerTypes, function (answerType, key) {
            _adjust_text_size(answerType.type, answerType.type, _text_size_test);
        });
    }

    function adjust_other_users_text(){
        let _text_size_test = document.getElementById("text-size-test");
        angular.forEach($scope.otherUsers, function (otherUser, key) {
            _adjust_text_size(otherUser.email, otherUser.email, _text_size_test);
        });
    }

    function _get_user_from_session() {
        $http({
            method: 'GET',
            url: '/api/v1/user/get-user-from-session',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                if (!response.data) {
                    window.location = "/#!/login";
                }
                var user = response.data;
                var userFLName = user.firstName + " " + user.lastName;
                if (userFLName === " ") {
                    userFLName = user.email;
                }
                $scope.email = user.email;
                document.getElementById('f_l_name').textContent = userFLName;
            }
        );
    }

    function _get_questions() {
        $http({
            method: 'GET',
            url: '/api/v1/question/get_questions_from_session_user',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questions = response.data;
            }
        );
    }

    function _get_all_other_users() {
        $http({
            method: 'GET',
            url: '/api/v1/user/get-all-other-users',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.otherUsers = response.data;
                $scope.selectedUserEmail = $scope.otherUsers[0].email;
                let _text_size_test = document.getElementById("text-size-test");
                _adjust_text_size("forUser", $scope.otherUsers[0].email, _text_size_test);
            }
        );
    }

    function _adjust_text_size(text_id, text, _text_size_test) {
        let _text = document.getElementById(text_id);
        _text_size_test.innerHTML = text;
        let font_size = _text.style.fontSize.substring(0, _text.style.fontSize.length - 2);
        _text_size_test.style.fontSize = font_size + "px";
        while(_text_size_test.offsetWidth>209) {
            font_size--;
            _text_size_test.style.fontSize = font_size + "px";
        }
        _text.style.fontSize = font_size + "px";
        _text.style.paddingRight = (209 - _text_size_test.offsetWidth) + "px";
    }

    function _get_answer_types() {
        $http({
            method: 'GET',
            url: '/api/v1/answer-type/get-all',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.answerTypes = response.data;
                $scope.selectedAnswerType = $scope.answerTypes[0].type;
                let _text_size_test = document.getElementById("text-size-test");
                _adjust_text_size("answerType", $scope.answerTypes[0].type, _text_size_test);
            }
        );
    }
});