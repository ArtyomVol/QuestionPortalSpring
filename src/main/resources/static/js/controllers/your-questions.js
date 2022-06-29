app.controller("YourQuestionsController", function ($scope, $http, $rootScope) {
    $scope.user;

    $scope.questions = [];
    $scope.answerTypes = [];
    $scope.otherUsers = [];

    $scope.selectedUserEmail = "";
    $scope.selectedAnswerType = "";
    $scope.questionText = "";
    $scope.options = "";

    $scope.questionForEdit = [];

    $scope.questionsPerPageOptions = ["1", "2", "5", "10", "25", "50", "100", "All"];

    $scope.questionsPerPage = 5;
    $scope.questionsCount = 0;
    $scope.paginationInfo = "";

    $scope.pagesNums = {
        firstPage: 1,
        pageBeforeBefore: 2,
        pageBefore: 3,
        currentPage: 4,
        pageAfter: 5,
        pageAfterAfter: 6,
        lastPage: 7
    };

    $scope.answerTypesWithoutOptions = ["Single line text", "Multiline text", "Date"];

    pageLoad();

    function pageLoad() {
        getUserFromSession();
        let textSizeTest = document.getElementById("text-size-test");
        adjustTextSize("questionsPerPage", $scope.questionsPerPage, textSizeTest, 26);
        let socket = new SockJS('/question-portal-websocket');
        $rootScope.stompClient = Stomp.over(socket);
        $rootScope.stompClient.connect({}, function () {
            $rootScope.stompClient.subscribe('/question/answer', function (message) {
                let email = JSON.parse(message.body).message;
                if (email === $scope.user.email) {
                    getQuestionsCount("currentPage");
                }
            });
        });
    }

    function sendMessage(message) {
        $rootScope.stompClient.send("/ws/question/change", {}, angular.toJson({'message': message}));
    }

    $scope.replaceSelectedUserEmailOnQuestionAdd = function (selectedUserEmail) {
        let currentText = document.getElementById("forUserOnQuestionAdd");
        let newText = document.getElementById(selectedUserEmail);
        $scope.selectedUserEmail = selectedUserEmail;
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
    }

    $scope.replaceSelectedUserEmailOnQuestionEdit = function (selectedUserEmail) {
        let currentText = document.getElementById("forUserOnQuestionEdit");
        let newText = document.getElementById(selectedUserEmail + "Edit");
        $scope.questionForEdit.forUser =
            $scope.otherUsers.find(u => u.email === selectedUserEmail);
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
    }

    $scope.replaceSelectedQuestionsPerPage = function (questionsPerPageOption) {
        let currentText = document.getElementById("questionsPerPage");
        let newText = document.getElementById(questionsPerPageOption + "QuestionsPerPage");
        $scope.questionsPerPage = questionsPerPageOption;
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
        getQuestionsCount("currentPage");
    }

    $scope.replaceSelectedAnswerTypeOnQuestionAdd = function (selectedAnswerType) {
        let currentText = document.getElementById("answerTypeOnQuestionAdd");
        let newText = document.getElementById(selectedAnswerType);
        $scope.selectedAnswerType = selectedAnswerType;
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
        showOrHideAnswerOptions(selectedAnswerType, "optionsBlockOnQuestionAdd",
            "optionsOnQuestionAdd");
    }

    $scope.replaceSelectedAnswerTypeOnQuestionEdit = function (selectedAnswerType) {
        let currentText = document.getElementById("answerTypeOnQuestionEdit");
        let newText = document.getElementById(selectedAnswerType + "Edit");
        $scope.questionForEdit.answerType =
            $scope.answerTypes.find(a => a.type === selectedAnswerType);
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
        showOrHideAnswerOptions(selectedAnswerType, "optionsBlockOnQuestionEdit",
            "optionsOnQuestionEdit");
    }

    $scope.adjustAddQuestionText = function () {
        let textSizeTest = document.getElementById("text-size-test");
        adjustTextSize("forUserOnQuestionAdd", $scope.selectedUserEmail, textSizeTest, 209);
        adjustTextSize("answerTypeOnQuestionAdd", $scope.selectedAnswerType, textSizeTest, 209);
        adjustOtherUsersText("", textSizeTest);
        adjustAnswerTypeText("", textSizeTest);
        showOrHideAnswerOptions($scope.selectedAnswerType, "optionsBlockOnQuestionAdd",
            "optionsOnQuestionAdd");
    }

    $scope.adjustEditQuestionText = function (question) {
        $scope.questionForEdit = angular.copy(question);
        let textSizeTest = document.getElementById("text-size-test");
        adjustTextSize("forUserOnQuestionEdit", $scope.questionForEdit.forUser.email, textSizeTest, 209);
        adjustTextSize("answerTypeOnQuestionEdit", $scope.questionForEdit.answerType.type, textSizeTest, 209);
        adjustOtherUsersText("Edit", textSizeTest);
        adjustAnswerTypeText("Edit", textSizeTest);
        showOrHideAnswerOptions($scope.questionForEdit.answerType.type, "optionsBlockOnQuestionEdit",
            "optionsOnQuestionEdit");
    }

    function showOrHideAnswerOptions(answerType, optionsBlockId, optionsId) {
        if ($scope.answerTypesWithoutOptions.includes(answerType)) {
            document.getElementById(optionsId).removeAttribute("required");
            document.getElementById(optionsBlockId).style.display = "none";
        } else {
            document.getElementById(optionsId).setAttribute("required", "");
            document.getElementById(optionsBlockId).style.display = "";
        }
    }

    function adjustAnswerTypeText(textIdAfter, textSizeTest) {
        angular.forEach($scope.answerTypes, function (answerType) {
            adjustTextSize(answerType.type + textIdAfter, answerType.type, textSizeTest, 209);
        });
    }

    function adjustOtherUsersText(textIdAfter, textSizeTest) {
        angular.forEach($scope.otherUsers, function (otherUser) {
            adjustTextSize(otherUser.email + textIdAfter, otherUser.email, textSizeTest, 209);
        });
    }

    $scope.adjustQuestionsPerPageText = function () {
        let textSizeTest = document.getElementById("text-size-test");
        angular.forEach($scope.questionsPerPageOptions, function (option) {
            adjustTextSize(option + "QuestionsPerPage", option, textSizeTest, 26);
        });
    }

    function adjustTextSize(textId, text, textSizeTest, necessaryWidth) {
        let textElement = document.getElementById(textId);
        textSizeTest.innerHTML = text;
        let fontSize = 16;
        textSizeTest.style.fontSize = fontSize + "px";
        while (textSizeTest.offsetWidth > necessaryWidth) {
            fontSize--;
            textSizeTest.style.fontSize = fontSize + "px";
        }
        textElement.style.fontSize = fontSize + "px";
        textElement.style.paddingRight = (necessaryWidth - textSizeTest.offsetWidth) + "px";
    }

    $scope.addQuestion = function () {
        let errorMsg = checkQuestionFields($scope.questionText, $scope.selectedAnswerType, $scope.options);
        if (errorMsg !== "") {
            alertModify(errorMsg, "Error");
        } else {
            let newQuestion = {
                fromUser: $scope.user,
                forUser: $scope.otherUsers.find(x => x.email === $scope.selectedUserEmail),
                questionText: $scope.questionText,
                answerType: $scope.answerTypes.find(x => x.type === $scope.selectedAnswerType),
                answerOptions: $scope.options,
                answer: ""
            };
            if ($scope.answerTypesWithoutOptions.includes(newQuestion.answerType.type)) {
                newQuestion.answerOptions = "";
            }
            $http({
                method: 'POST',
                url: '/api/v1/questions/create',
                data: angular.toJson(newQuestion),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    alertModify(response.data.message);
                    closeModal();
                    getQuestionsCount("currentPage");
                    sendMessage(newQuestion.forUser.email);
                }
            );
        }
    }

    $scope.editQuestion = function () {
        let errorMsg = checkQuestionFields($scope.questionForEdit.questionText, $scope.questionForEdit.answerType.type,
            $scope.questionForEdit.answerOptions);
        if (errorMsg !== "") {
            alertModify(errorMsg, "Error");
        } else {
            if ($scope.answerTypesWithoutOptions.includes($scope.questionForEdit.answerType.type)) {
                $scope.questionForEdit.answerOptions = "";
            }
            $scope.questionForEdit.answer = "";
            $http({
                method: 'PUT',
                url: '/api/v1/questions/',
                data: angular.toJson($scope.questionForEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    alertModify(response.data.message);
                    closeModal();
                    getQuestionsCount("currentPage");
                    sendMessage($scope.questionForEdit.forUser.email);
                }
            );
        }
    }

    $scope.deleteQuestion = function (question) {
        $http({
            method: 'DELETE',
            url: '/api/v1/questions/' + question.id,
            data: angular.toJson(question),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function () {
                getQuestionsCount("currentPage");
                sendMessage(question.forUser.email);
            }
        );
    }

    function getUserFromSession() {
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
                } else {
                    $scope.user = response.data;
                    let userFLName = $scope.user.firstName + " " + $scope.user.lastName;
                    if (userFLName === " ") {
                        userFLName = $scope.user.email;
                    }
                    document.getElementById('f_l_name').textContent = userFLName;
                    $scope.canGoNext = true;
                    getQuestionsCount("firstPage");
                    getAnswerTypes();
                    getAllOtherUsers();
                }
            }
        );
    }

    $scope.paginationClick = function (buttonId) {
        getQuestionsCount(buttonId);
    }

    function getQuestions() {
        $http({
            method: 'GET',
            url: '/api/v1/questions/from-me?questions-per-page=' +
                $scope.questionsPerPage + '&page-num=' + $scope.pagesNums.currentPage,
            data: angular.toJson($scope.pagination),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questions = response.data;
            },
            function (response) {
                alertModify(response.data.message, "Error");
                window.location = "/#!/login";
            }
        );
    }

    function getAllQuestions() {
        $http({
            method: 'GET',
            url: '/api/v1/questions/from-me/all',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questions = response.data;
            },
            function (response) {
                alertModify(response.data.message, "Error");
                window.location = "/#!/login";
            }
        );
    }

    function getQuestionsCount(buttonId) {
        $http({
            method: 'GET',
            url: '/api/v1/questions/from-me/count',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questionsCount = response.data;
                modifyPagination(buttonId);
            },
            function (response) {
                alertModify(response.data.message, "Error");
                window.location = "/#!/login";
            }
        );
    }

    function modifyPagination(buttonId) {
        let result = Pagination_controller.modifyPagination(buttonId, $scope.questionsPerPage, $scope.questionsCount,
            $scope.pagesNums);
        $scope.pagesNums = result.pagesNums;
        let questionsIsAll = result.questionsIsAll;
        $scope.paginationInfo = result.paginationInfo;
        if (questionsIsAll) {
            getAllQuestions();
        } else {
            getQuestions();
        }
    }

    function getAllOtherUsers() {
        $http({
            method: 'GET',
            url: '/api/v1/users/other',
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
            url: '/api/v1/answer/types/',
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

    function checkQuestionFields(questionText, answerType, answerOption) {
        let errorMsg = "";
        if (questionText.length > 100) {
            errorMsg += "The length of the question must be no more than 100 characters.\n";
        }
        if (!$scope.answerTypesWithoutOptions.includes(answerType) && (answerOption.length === 0 || answerOption.length > 100)) {
            errorMsg += "The length of the answer options must be no less than 0 and no more than 100 characters.\n";
        }
        return errorMsg;
    }

    function closeModal() {
        let modalWindow = document.getElementsByClassName("modal fade show")[0];
        modalWindow.getElementsByClassName("btn-close")[0].click();
    }
});