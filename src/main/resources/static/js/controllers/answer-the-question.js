app.controller("AnswerTheQuestionController", function ($scope, $http, $rootScope) {
    $scope.user;

    $scope.questions = [];
    $scope.answerTypes = [];
    $scope.otherUsers = [];

    $scope.selectedUserEmail = "";
    $scope.selectedAnswerType = "";
    $scope.questionText = "";
    $scope.options = "";

    $scope.modifiedQuestionOption = [];
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

    pageLoad();

    function pageLoad() {
        getUserFromSession();
        adjustTextSize("questionsPerPage", $scope.questionsPerPage, "text-size-test", 26);
        let socket = new SockJS('/question-portal-websocket');
        $rootScope.stompClient = Stomp.over(socket);
        $rootScope.stompClient.connect({}, function () {
            $rootScope.stompClient.subscribe('/question/change', function (message) {
                let email = JSON.parse(message.body).message;
                if (email === $scope.user.email) {
                    getQuestionsCount("currentPage");
                }
            });
        });
    }

    function sendMessage(message) {
        $rootScope.stompClient.send("/ws/question/answer", {}, JSON.stringify({'message': message}));
    }

    $scope.replaceSelectedQuestionsPerPage = function (questionsPerPageOption) {
        let currentText = document.getElementById("questionsPerPage");
        let newText = document.getElementById(questionsPerPageOption + "QuestionsPerPage");
        $scope.questionsPerPage = questionsPerPageOption;
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
        getQuestionsCount("currentPage");
    }

    $scope.prepareQuestion = function (question) {
        $scope.questionForEdit = angular.copy(question);
        $scope.modifiedQuestionOption = [];
        if ($scope.questionForEdit.answerType.type === "Radio button") {
            createModifiedQuestionOption($scope.questionForEdit);
            if ($scope.questionForEdit.answer !== "") {
                $scope.modifiedQuestionOption.find(x => x.option === $scope.questionForEdit.answer).checked = true;
            }
        } else if ($scope.questionForEdit.answerType.type === "Check box") {
            createModifiedQuestionOption($scope.questionForEdit);
            if ($scope.questionForEdit.answer !== "") {
                let answerChoices = $scope.questionForEdit.answer.split("\n");
                angular.forEach(answerChoices, function (answerChoice) {
                    $scope.modifiedQuestionOption.find(x => x.option === answerChoice).checked = true;
                })
            }
        } else if ($scope.questionForEdit.answerType.type === "Combo box") {
            createModifiedQuestionOption($scope.questionForEdit);
            if ($scope.questionForEdit.answer === "") {
                $scope.questionForEdit.answer = $scope.questionForEdit.answerOptions.split('\n', 1);
            }
            $scope.modifiedQuestionOption.find(x => x.option === $scope.questionForEdit.answer).checked = true;
        }
    }

    function createModifiedQuestionOption(question) {
        let id = 1;
        let questionOptions = question.answerOptions.split('\n');
        angular.forEach(questionOptions, function (option) {
            $scope.modifiedQuestionOption.push({option: option, id: id, checked: false});
            id++;
        });
    }

    $scope.adjustQuestionsPerPageText = function () {
        angular.forEach($scope.questionsPerPageOptions, function (option) {
            adjustTextSize(option + "QuestionsPerPage", option, 26);
        });
    }

    function adjustTextSize(textId, text, necessaryWidth) {
        let textSizeTest = document.getElementById("text-size-test");
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

    $scope.editQuestion = function () {
        let errorMsg = enterQuestionAnswer();
        if (errorMsg === "") {
            $http({
                method: 'PUT',
                url: '/api/v1/questions/',
                data: angular.toJson($scope.questionForEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    alert(response.data.message);
                    closeModal();
                    getQuestionsCount("currentPage");
                    sendMessage($scope.questionForEdit.fromUser.email);
                }
            );
        } else {
            alert(errorMsg);
        }
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
                }
            }
        );
    }

    $scope.paginationClick = function (buttonId) {
        getQuestionsCount(buttonId);
    }

    function getAllQuestions() {
        $http({
            method: 'GET',
            url: '/api/v1/questions/questions/for-me/all',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questions = response.data;
            },
            function (response) {
                alert(response.data.message);
                window.location = "/#!/login";
            }
        );
    }

    function getQuestions() {
        $http({
            method: 'GET',
            url: '/api/v1/questions/for-me?questions-per-page=' +
                $scope.questionsPerPage + '&page-num=' + $scope.pagesNums.currentPage,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questions = response.data;
            },
            function (response) {
                alert(response.data.message);
                window.location = "/#!/login";
            }
        );
    }

    function getQuestionsCount(buttonId) {
        $http({
            method: 'GET',
            url: '/api/v1/questions/for-me/count',
            data: angular.toJson($scope.pagination),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questionsCount = response.data;
                modifyPagination(buttonId);
            },
            function (response) {
                alert(response.data.message);
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

    function enterQuestionAnswer() {
        let errorMsg = "";
        if ($scope.questionForEdit.answerType.type === "Radio button") {
            angular.forEach($scope.modifiedQuestionOption, function (modifiedOption) {
                if (document.getElementById('radioButton' + modifiedOption.id).checked) {
                    $scope.questionForEdit.answer = modifiedOption.option;
                }
            });
        } else if ($scope.questionForEdit.answerType.type === "Check box") {
            $scope.questionForEdit.answer = "";
            angular.forEach($scope.modifiedQuestionOption, function (modifiedOption) {
                if (document.getElementById('checkBox' + modifiedOption.id).checked) {
                    if ($scope.questionForEdit.answer.length > 0) {
                        $scope.questionForEdit.answer += "\n" + modifiedOption.option;
                    } else {
                        $scope.questionForEdit.answer += modifiedOption.option;
                    }
                }
            });
        } else if ($scope.questionForEdit.answerType.type === "Combo box") {
            $scope.questionForEdit.answer = document.getElementById('comboBox').value;
        } else if ($scope.questionForEdit.answerType.type === "Date") {
            $scope.questionForEdit.answer = document.getElementById("Date").value;
        }else if ($scope.questionForEdit.answer.length > 100) {
            errorMsg = "The length of the answer must be no more then 100 characters."
        }
        return errorMsg;
    }

    function closeModal() {
        let modalWindow = document.getElementsByClassName("modal fade show")[0];
        modalWindow.getElementsByClassName("btn-close")[0].click();
    }
/*
    window.onbeforeunload = function()
    {
        confirm("Страница закрывается");
        return "123";
    }*/
});

