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

    $scope.questionsPerPage = 2;
    $scope.questionsCount = 0;
    $scope.paginationInfo= "";

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

    $scope.replaceSelectedAnswerTypeOnQuestionAdd = function (selectedAnswerType) {
        let currentText = document.getElementById("answerTypeOnQuestionAdd");
        let newText = document.getElementById(selectedAnswerType);
        $scope.selectedAnswerType = selectedAnswerType;
        currentText.style.fontSize = newText.style.fontSize;
        currentText.style.paddingRight = newText.style.paddingRight;
    }

    $scope.replaceSelectedAnswerTypeOnQuestionEdit = function (selectedAnswerType) {
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

    function adjustAnswerTypeText(textIdAfter, textSizeTest) {
        angular.forEach($scope.answerTypes, function (answerType, key) {
            adjustTextSize(answerType.type + textIdAfter, answerType.type, textSizeTest);
        });
    }

    function adjustOtherUsersText(textIdAfter, textSizeTest) {
        angular.forEach($scope.otherUsers, function (otherUser, key) {
            adjustTextSize(otherUser.email + textIdAfter, otherUser.email, textSizeTest);
        });
    }

    function adjustTextSize(textId, text, textSizeTest) {
        let textElement = document.getElementById(textId);
        textSizeTest.innerHTML = text;
        let fontSize = 16;
        textSizeTest.style.fontSize = fontSize + "px";
        while (textSizeTest.offsetWidth > 209) {
            fontSize--;
            textSizeTest.style.fontSize = fontSize + "px";
        }
        textElement.style.fontSize = fontSize + "px";
        textElement.style.paddingRight = (209 - textSizeTest.offsetWidth) + "px";
    }

    $scope.addQuestion = function () {
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
                getQuestionsCount("currentPage");
            }
        );
    }

    $scope.editQuestion = function () {
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
                getQuestionsCount("currentPage");
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
                getQuestionsCount("currentPage");
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
            url: '/api/v1/question/get_questions_from_session_user?questions_per_page=' +
                $scope.questionsPerPage + '&page_num=' + $scope.pagesNums.currentPage,
            data: angular.toJson($scope.pagination),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questions = response.data;
            }
        );
    }

    function getQuestionsCount(buttonId) {
        $http({
            method: 'GET',
            url: '/api/v1/question/get_questions_from_session_user_count',
            data: angular.toJson($scope.pagination),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(
            function (response) {
                $scope.questionsCount = response.data;
                modifyPagination(buttonId);
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
        $scope.paginationInfo = firstQuestionId + "-" + lastQuestionId + " of " + $scope.questionsCount;
        getQuestions();
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
                $scope.pagesNums.currentPage+=2;
                break;
            case "lastPage" :
                $scope.pagesNums.currentPage=$scope.pagesNums.lastPage;
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
        let modalWindow = document.getElementsByClassName("modal fade show")[0];
        modalWindow.getElementsByClassName("btn-close")[0].click();
    }
});