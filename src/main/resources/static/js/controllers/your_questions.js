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
        let textSizeTest = document.getElementById("text-size-test");
        adjustTextSize("questionsPerPage", $scope.questionsPerPage, textSizeTest, 26);
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

    function showOrHideAnswerOptions(answerType, optionsBlockId, optionsId){
        if (answerType === "Text") {
            document.getElementById(optionsId).removeAttribute("required");
            document.getElementById(optionsBlockId).style.display = "none";
        }
        else {
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
            alert(errorMsg);
        } else {
            let newQuestion = {
                fromUser: $scope.user,
                forUser: $scope.otherUsers.find(x => x.email === $scope.selectedUserEmail),
                questionText: $scope.questionText,
                answerType: $scope.answerTypes.find(x => x.type === $scope.selectedAnswerType),
                answerOptions: $scope.options,
                answer: ""
            };
            if (newQuestion.answerType.type === "Text"){
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
                    alert(response.data.message);
                    closeModal();
                    getQuestionsCount("currentPage");
                }
            );
        }
    }

    $scope.editQuestion = function () {
        let errorMsg = checkQuestionFields($scope.questionForEdit.questionText, $scope.questionForEdit.answerType.type,
            $scope.questionForEdit.answerOptions);
        if (errorMsg !== "") {
            alert(errorMsg);
        } else {
            if ($scope.questionForEdit.answerType.type === "Text"){
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
                    alert(response.data.message);
                    closeModal();
                    getQuestionsCount("currentPage");
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
            }
        );
    }

    function getUserFromSession() {
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
            url: '/api/v1/questions/get_questions_from_session_user?questions_per_page=' +
                $scope.questionsPerPage + '&page_num=' + $scope.pagesNums.currentPage,
            data: angular.toJson($scope.pagination),
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
            url: '/api/v1/questions/count',
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
        let previousPageParent = document.getElementById("previousPageParent");
        let previousPage = document.getElementById("previousPage");
        let firstPage = document.getElementById("firstPage");
        let pagesBefore = document.getElementById("pagesBefore");
        let pageBeforeBefore = document.getElementById("pageBeforeBefore");
        let pageBefore = document.getElementById("pageBefore");
        let currentPage = document.getElementById("currentPage");
        let pageAfter = document.getElementById("pageAfter");
        let pageAfterAfter = document.getElementById("pageAfterAfter");
        let pagesAfter = document.getElementById("pagesAfter");
        let lastPage = document.getElementById("lastPage");
        let nextPage = document.getElementById("nextPage");
        let nextPageParent = document.getElementById("nextPageParent");
        let questionsIsAll = false;
        if ($scope.questionsPerPage === "All") {
            $scope.questionsPerPage = $scope.questionsCount;
            questionsIsAll = true;
        }
        let pagesCount = Math.ceil($scope.questionsCount / $scope.questionsPerPage);
        if ($scope.questionsCount === 0) {
            modifyPaginationIfQuestionsCountIsZero(previousPageParent, nextPageParent, firstPage, pagesBefore,
                pageBeforeBefore, pageBefore, currentPage, pageAfter, pageAfterAfter, pagesAfter, lastPage);
            $scope.pagesNums.currentPage = 1;
        } else {
            setPaginationNums(buttonId, pagesCount);
            previousAndAfterPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
                pageBefore, currentPage, pageAfter, pageAfterAfter, pagesAfter, lastPage,
                nextPage, nextPageParent, pagesCount);
        }
        if (buttonId !== "previousPage" && buttonId !== "nextPage") {
            currentPage.focus();
        }
        let firstQuestionId = ($scope.pagesNums.currentPage - 1) * $scope.questionsPerPage + 1;
        let lastQuestionId =
            Math.min($scope.pagesNums.currentPage * $scope.questionsPerPage, $scope.questionsCount);
        if (lastQuestionId === 0) {
            firstQuestionId = 0;
        }
        $scope.paginationInfo = firstQuestionId + "-" + lastQuestionId + " of " + $scope.questionsCount;
        getQuestions();
        if (questionsIsAll) {
            $scope.questionsPerPage = "All";
        }
    }

    function setPaginationNums(buttonId, pagesCount) {
        setCurrentPageNum(buttonId, pagesCount);
        $scope.pagesNums.pageBeforeBefore = $scope.pagesNums.currentPage - 2;
        $scope.pagesNums.pageBefore = $scope.pagesNums.currentPage - 1;
        $scope.pagesNums.pageAfter = $scope.pagesNums.currentPage + 1;
        $scope.pagesNums.pageAfterAfter = $scope.pagesNums.currentPage + 2;
        $scope.pagesNums.lastPage = pagesCount;
    }

    function setCurrentPageNum(buttonId, pagesCount) {
        switch (buttonId) {
            case "previousPage" :
            case "pageBefore" :
                $scope.pagesNums.currentPage--;
                break;
            case "firstPage" :
                $scope.pagesNums.currentPage = 1;
                break;
            case "pageBeforeBefore" :
                $scope.pagesNums.currentPage -= 2;
                break;
            case "nextPage" :
            case "pageAfter" :
                $scope.pagesNums.currentPage++;
                break;
            case "pageAfterAfter" :
                $scope.pagesNums.currentPage += 2;
                break;
            case "lastPage" :
                $scope.pagesNums.currentPage = $scope.pagesNums.lastPage;
                break;
        }
        if (pagesCount < $scope.pagesNums.currentPage) {
            $scope.pagesNums.currentPage = pagesCount;
        }
    }

    function modifyPaginationIfQuestionsCountIsZero(previousPageParent, nextPageParent, firstPage, pagesBefore,
                                                    pageBeforeBefore, pageBefore, currentPage, pageAfter,
                                                    pageAfterAfter, pagesAfter, lastPage) {
        let disabled = "disabled";
        let none = "none";
        previousPageParent.classList.add(disabled);
        nextPageParent.classList.add(disabled);
        firstPage.style.display = none;
        pagesBefore.style.display = none;
        pageBeforeBefore.style.display = none;
        pageBefore.style.display = none;
        currentPage.style.display = none;
        pageAfter.style.display = none;
        pageAfterAfter.style.display = none;
        pagesAfter.style.display = none;
        lastPage.style.display = none;
    }

    function previousAndAfterPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
                                                 pageBefore, currentPage, pageAfter, pageAfterAfter, pagesAfter, lastPage,
                                                 nextPage, nextPageParent, pagesCount) {
        previousPagesPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
            pageBefore);
        afterPagesPaginationModifying(pageAfter, pageAfterAfter, pagesAfter, lastPage, nextPage, nextPageParent,
            pagesCount);
    }

    function previousPagesPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
                                              pageBefore) {
        let block = "block";
        let none = "none";
        let disabled = "disabled";
        firstPage.style.display = none;
        pageBeforeBefore.style.display = none;
        pageBefore.style.display = none;
        pagesBefore.style.display = none;
        if ($scope.pagesNums.currentPage === 1) {
            previousPageParent.classList.add(disabled);
        } else {
            previousPageParent.classList.remove(disabled);
            if ($scope.pagesNums.currentPage >= 2) {
                pageBefore.style.display = block;
                $scope.pagesNums.pageBefore = $scope.pagesNums.currentPage - 1;
            }
            if ($scope.pagesNums.currentPage >= 3) {
                pageBeforeBefore.style.display = block;
                $scope.pagesNums.pageBeforeBefore = $scope.pagesNums.currentPage - 2;
            }
            if ($scope.pagesNums.currentPage === 4) {
                pagesBefore.style.display = none;
                firstPage.style.display = block;
                $scope.pagesNums.firstPage = 1;
            } else if ($scope.pagesNums.currentPage > 4) {
                pagesBefore.style.display = block;
                firstPage.style.display = block;
                $scope.pagesNums.lastPage = 1;
            }
        }
    }

    function afterPagesPaginationModifying(pageAfter, pageAfterAfter, pagesAfter, lastPage, nextPage, nextPageParent,
                                           pagesCount) {
        let block = "block";
        let none = "none";
        let disabled = "disabled";
        pagesAfter.style.display = none;
        pageAfter.style.display = none;
        pageAfterAfter.style.display = none;
        lastPage.style.display = none;
        if (pagesCount - $scope.pagesNums.currentPage === 0) {
            nextPageParent.classList.add(disabled);
        } else {
            nextPageParent.classList.remove(disabled);
            if (pagesCount - $scope.pagesNums.currentPage >= 1) {
                pageAfter.style.display = block;
                $scope.pagesNums.pageAfter = $scope.pagesNums.currentPage + 1;
            }
            if (pagesCount - $scope.pagesNums.currentPage >= 2) {
                pageAfterAfter.style.display = block;
                $scope.pagesNums.pageAfterAfter = $scope.pagesNums.currentPage + 2;
            }
            if (pagesCount - $scope.pagesNums.currentPage === 3) {
                pagesAfter.style.display = none;
                lastPage.style.display = block;
                $scope.pagesNums.lastPage = pagesCount;
            } else if (pagesCount - $scope.pagesNums.currentPage > 3) {
                pagesAfter.style.display = block;
                lastPage.style.display = block;
                $scope.pagesNums.lastPage = pagesCount;
            }
        }
    }

    function getAllOtherUsers() {
        $http({
            method: 'GET',
            url: '/api/v1/users/get-all-other-users',
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
            url: '/api/v1/answer-types/',
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
        if (answerType !== "Text" && (answerOption.length === 0 || answerOption.length > 100)) {
            errorMsg += "The length of the answer options must be no less than 0 and no more than 100 characters.\n";
        }
        return errorMsg;
    }


    let newQuestion = {
        fromUser: $scope.user,
        forUser: $scope.otherUsers.find(x => x.email === $scope.selectedUserEmail),
        questionText: $scope.questionText,
        answerType: $scope.answerTypes.find(x => x.type === $scope.selectedAnswerType),
        answerOptions: $scope.options,
        answer: ""
    };

    function closeModal() {
        let modalWindow = document.getElementsByClassName("modal fade show")[0];
        modalWindow.getElementsByClassName("btn-close")[0].click();
    }
});