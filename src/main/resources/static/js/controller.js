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

    pageLoad();

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
            clearFormData();
        } else if ($scope.user.password !== $scope.confirmPassword) {
            errorMsg += "Passwords mismatch\n";
            clearFormData();
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

    function pageLoad() {
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

    function clearFormData() {
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

    pageLoad();

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

    pageLoad();

    function pageLoad() {
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
                            pageLoad();
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
                    clearFormData();
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
            clearFormData();
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

    function clearFormData() {
        $scope.user.password = "";
        $scope.oldPassword = "";
    }
});

app.controller("DeleteProfileController", function ($scope, $http) {
    $scope.password = "";

    $scope.message = {
        message: ""
    };

    pageLoad();

    function pageLoad() {
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
                clearFormData();
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

    function clearFormData() {
        $scope.password = "";
    }
});

app.controller("YourQuestionsController", function ($scope, $http) {
    $scope.forUserPoints = "";
    $scope.user;

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

    pageLoad();

    function pageLoad() {
        getUserFromSession();
        getQuestions();
        getAnswerTypes();
        getAllOtherUsers();
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

    $scope.replaceSelectedUserEmail = function (selectedUserEmail){
        let current_text = document.getElementById("forUser");
        let new_text = document.getElementById(selectedUserEmail);
        $scope.selectedUserEmail = selectedUserEmail;
        current_text.style.fontSize = new_text.style.fontSize;
        current_text.style.paddingRight = new_text.style.paddingRight;
    }

    $scope.replaceSelectedAnswerType = function (selectedAnswerType){
        let current_text = document.getElementById("answerType");
        let new_text = document.getElementById(selectedAnswerType);
        $scope.selectedAnswerType = selectedAnswerType;
        current_text.style.fontSize = new_text.style.fontSize;
        current_text.style.paddingRight = new_text.style.paddingRight;
    }

    $scope.adjustOtherUsersAndAnswerTypesText = function () {
        adjustOtherUsersText();
        adjustAnswerTypeText();
        let _text_size_test_parent = document.getElementById("body-container-fluid");
        _text_size_test_parent.removeChild(_text_size_test);
    }

    function adjustAnswerTypeText(){
        let _text_size_test = document.getElementById("text-size-test");
        angular.forEach($scope.answerTypes, function (answerType, key) {
            adjustTextSize(answerType.type, answerType.type, _text_size_test);
        });
    }

    function adjustOtherUsersText(){
        let _text_size_test = document.getElementById("text-size-test");
        angular.forEach($scope.otherUsers, function (otherUser, key) {
            adjustTextSize(otherUser.email, otherUser.email, _text_size_test);
        });
    }

    function getUserFromSession() {
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
                var userFLName = $scope.user.firstName + " " + $scope.user.lastName;
                if (userFLName === " ") {
                    userFLName = $scope.user.email;
                }
                document.getElementById('f_l_name').textContent = userFLName;
            }
        );
    }

    function getQuestions() {
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

    function getAllOtherUsers() {
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
                adjustTextSize("forUser", $scope.otherUsers[0].email, _text_size_test);
            }
        );
    }

    function adjustTextSize(text_id, text, _text_size_test) {
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

    function getAnswerTypes() {
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
                adjustTextSize("answerType", $scope.answerTypes[0].type, _text_size_test);
            }
        );
    }

    $scope.addQuestion = function (){
        let newQuestion = {
            fromUser: $scope.user,
            forUser: $scope.otherUsers.find(x => x.email === $scope.selectedUserEmail),
            questionText: $scope.question,
            answerType: $scope.answerTypes.find(x => x.type === $scope.selectedAnswerType),
            answerOptions: $scope.options,
            answer: ""
        };
        $http({
            method: 'POST',
            url: '/api/v1/question/create',
            data: angular.toJson(newQuestion),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                alert(response.data.message);
                document.getElementById("myModal").close();
            }
        );
    }
});