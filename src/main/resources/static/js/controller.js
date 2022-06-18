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

app.controller("YourQuestionsController", function ($scope, $http, $route) {
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
    $scope.questionText = "";
    $scope.options = "";

    $scope.questionForEdit = [];

    pageLoad();

    function pageLoad() {
        getUserFromSession();
    }

    $scope.replaceSelectedUserEmailOnQuestionAdd = function (selectedUserEmail){
        let currentText = document.getElementById("forUserOnQuestionAdd");
        let newText = document.getElementById(selectedUserEmail);
        $scope.selectedUserEmail = selectedUserEmail;
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
    }

    $scope.replaceSelectedUserEmailOnQuestionEdit = function (selectedUserEmail){
        let currentText = document.getElementById("forUserOnQuestionEdit");
        let newText = document.getElementById(selectedUserEmail + "Edit");
        $scope.questionForEdit.forUser =
            $scope.otherUsers.find(u => u.email === selectedUserEmail);
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
    }

    $scope.replaceSelectedAnswerTypeOnQuestionAdd = function (selectedAnswerType){
        let currentText = document.getElementById("answerTypeOnQuestionAdd");
        let newText = document.getElementById(selectedAnswerType);
        $scope.selectedAnswerType = selectedAnswerType;
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
    }

    $scope.replaceSelectedAnswerTypeOnQuestionEdit = function (selectedAnswerType){
        let currentText = document.getElementById("answerTypeOnQuestionEdit");
        let newText = document.getElementById(selectedAnswerType + "Edit");
        $scope.questionForEdit.answerType =
            $scope.answerTypes.find(a => a.type === selectedAnswerType);
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
    }

    $scope.adjustAddQuestionText = function () {
        let textSizeTest = document.getElementById("text-size-test");
        adjustTextSize("forUserOnQuestionAdd", $scope.selectedUserEmail, textSizeTest);
        adjustTextSize("answerTypeOnQuestionAdd", $scope.selectedAnswerType, textSizeTest);
        adjustOtherUsersText("", textSizeTest);
        adjustAnswerTypeText("", textSizeTest);
    }

    $scope.adjustEditQuestionText = function (question) {
        $scope.questionForEdit = angular.copy(question);
        let textSizeTest = document.getElementById("text-size-test");
        adjustTextSize("forUserOnQuestionEdit", $scope.questionForEdit.forUser.email, textSizeTest);
        adjustTextSize("answerTypeOnQuestionEdit", $scope.questionForEdit.answerType.type, textSizeTest);
        adjustOtherUsersText("Edit", textSizeTest);
        adjustAnswerTypeText("Edit", textSizeTest);
    }

    function adjustAnswerTypeText(textIdAfter, textSizeTest){
        angular.forEach($scope.answerTypes, function (answerType, key) {
            adjustTextSize(answerType.type + textIdAfter, answerType.type, textSizeTest);
        });
    }

    function adjustOtherUsersText(textIdAfter, textSizeTest){
        angular.forEach($scope.otherUsers, function (otherUser, key) {
            adjustTextSize(otherUser.email + textIdAfter, otherUser.email, textSizeTest);
        });
    }

    function adjustTextSize(textId, text, textSizeTest) {
        let textElement = document.getElementById(textId);
        textSizeTest.innerHTML = text;
        let fontSize = 16;
        textSizeTest.style.fontSize = fontSize + "px";
        while(textSizeTest.offsetWidth>209) {
            fontSize--;
            textSizeTest.style.fontSize = fontSize + "px";
        }
        textElement.style.fontSize = fontSize + "px";
        textElement.style.paddingRight = (209 - textSizeTest.offsetWidth) + "px";
    }

    $scope.addQuestion = function (){
        let newQuestion = {
            fromUser: $scope.user,
            forUser: $scope.otherUsers.find(x => x.email === $scope.selectedUserEmail),
            questionText: $scope.questionText,
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
                closeModal();
                // ВРЕМЕННО!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                $route.reload();
            }
        );
    }

    $scope.editQuestion = function (){
        $http({
            method: 'POST',
            url: '/api/v1/question/edit',
            data: angular.toJson($scope.questionForEdit),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                alert(response.data.message);
                closeModal();
                // ВРЕМЕННО!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                $route.reload();
            }
        );
    }

    $scope.deleteQuestion = function (question) {
        $http({
            method: 'POST',
            url: '/api/v1/question/delete',
            data: angular.toJson(question),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function () {
                // ВРЕМЕННО!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                $route.reload();
            }
        );
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
                else {
                    $scope.user = response.data;
                    let userFLName = $scope.user.firstName + " " + $scope.user.lastName;
                    if (userFLName === " ") {
                        userFLName = $scope.user.email;
                    }
                    document.getElementById('f_l_name').textContent = userFLName;
                    $scope.canGoNext = true;
                    getQuestions();
                    getAnswerTypes();
                    getAllOtherUsers();
                }
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
            }
        );
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

    function closeModal() {
        let parent = document.getElementsByClassName("vsc-initialized modal-open")[0];
        let child = document.getElementsByClassName("modal-backdrop fade show")[0];
        parent.removeChild(child);
    }
});