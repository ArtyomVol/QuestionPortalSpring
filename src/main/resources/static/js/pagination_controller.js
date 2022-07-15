function modifyPaginationIfQuestionsCountIsZero(previousPageParent, nextPageParent, firstPage, pagesBefore,
                                                pageBeforeBefore, pageBefore, currentPage, pageAfter, pageAfterAfter,
                                                pagesAfter, lastPage) {
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

function setCurrentPageNum(buttonId, pagesCount, pagesNums) {
    switch (buttonId) {
        case "previousPage" :
        case "pageBefore" :
            pagesNums.currentPage--;
            break;
        case "firstPage" :
            pagesNums.currentPage = 1;
            break;
        case "pageBeforeBefore" :
            pagesNums.currentPage -= 2;
            break;
        case "nextPage" :
        case "pageAfter" :
            pagesNums.currentPage++;
            break;
        case "pageAfterAfter" :
            pagesNums.currentPage += 2;
            break;
        case "lastPage" :
            pagesNums.currentPage = pagesNums.lastPage;
            break;
    }
    if (pagesCount < pagesNums.currentPage) {
        pagesNums.currentPage = pagesCount;
    }
}

function setPaginationNums(buttonId, pagesCount, pagesNums) {
    setCurrentPageNum(buttonId, pagesCount, pagesNums);
    pagesNums.pageBeforeBefore = pagesNums.currentPage - 2;
    pagesNums.pageBefore = pagesNums.currentPage - 1;
    pagesNums.pageAfter = pagesNums.currentPage + 1;
    pagesNums.pageAfterAfter = pagesNums.currentPage + 2;
    pagesNums.lastPage = pagesCount;
}

function previousPagesPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
                                          pageBefore, pagesNums) {
    let block = "block";
    let none = "none";
    let disabled = "disabled";
    firstPage.style.display = none;
    pageBeforeBefore.style.display = none;
    pageBefore.style.display = none;
    pagesBefore.style.display = none;
    if (pagesNums.currentPage === 1) {
        previousPageParent.classList.add(disabled);
    } else {
        previousPageParent.classList.remove(disabled);
        if (pagesNums.currentPage >= 2) {
            pageBefore.style.display = block;
            pagesNums.pageBefore = pagesNums.currentPage - 1;
        }
        if (pagesNums.currentPage >= 3) {
            pageBeforeBefore.style.display = block;
            pagesNums.pageBeforeBefore = pagesNums.currentPage - 2;
        }
        if (pagesNums.currentPage === 4) {
            pagesBefore.style.display = none;
            firstPage.style.display = block;
            pagesNums.firstPage = 1;
        } else if (pagesNums.currentPage > 4) {
            pagesBefore.style.display = block;
            firstPage.style.display = block;
            pagesNums.lastPage = 1;
        }
    }
}

function afterPagesPaginationModifying(pageAfter, pageAfterAfter, pagesAfter, lastPage, nextPage, nextPageParent,
                                       pagesCount, pagesNums) {
    let block = "block";
    let none = "none";
    let disabled = "disabled";
    pagesAfter.style.display = none;
    pageAfter.style.display = none;
    pageAfterAfter.style.display = none;
    lastPage.style.display = none;
    if (pagesCount - pagesNums.currentPage === 0) {
        nextPageParent.classList.add(disabled);
    } else {
        nextPageParent.classList.remove(disabled);
        if (pagesCount - pagesNums.currentPage >= 1) {
            pageAfter.style.display = block;
            pagesNums.pageAfter = pagesNums.currentPage + 1;
        }
        if (pagesCount - pagesNums.currentPage >= 2) {
            pageAfterAfter.style.display = block;
            pagesNums.pageAfterAfter = pagesNums.currentPage + 2;
        }
        if (pagesCount - pagesNums.currentPage === 3) {
            pagesAfter.style.display = none;
            lastPage.style.display = block;
            pagesNums.lastPage = pagesCount;
        } else if (pagesCount - pagesNums.currentPage > 3) {
            pagesAfter.style.display = block;
            lastPage.style.display = block;
            pagesNums.lastPage = pagesCount;
        }
    }
}

function previousAndAfterPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
                                             pageBefore, currentPage, pageAfter, pageAfterAfter, pagesAfter, lastPage,
                                             nextPage, nextPageParent, pagesCount, pagesNums) {
    previousPagesPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
        pageBefore, pagesNums);
    afterPagesPaginationModifying(pageAfter, pageAfterAfter, pagesAfter, lastPage, nextPage, nextPageParent,
        pagesCount, pagesNums);
}

class Pagination_controller {
    static modifyPagination = function (buttonId, questionsPerPage, questionsCount, pagesNums) {
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
        if (questionsPerPage === "All") {
            questionsPerPage = questionsCount;
            questionsIsAll = true;
        }
        let pagesCount = Math.ceil(questionsCount / questionsPerPage);
        if (questionsCount === 0) {
            currentPage.style.display = "none";
            modifyPaginationIfQuestionsCountIsZero(previousPageParent, nextPageParent, firstPage, pagesBefore,
                pageBeforeBefore, pageBefore, currentPage, pageAfter, pageAfterAfter, pagesAfter, lastPage);
            pagesNums.currentPage = 1;
        } else {
            currentPage.style.display = "block";
            setPaginationNums(buttonId, pagesCount, pagesNums);
            previousAndAfterPaginationModifying(previousPageParent, previousPage, firstPage, pagesBefore, pageBeforeBefore,
                pageBefore, currentPage, pageAfter, pageAfterAfter, pagesAfter, lastPage,
                nextPage, nextPageParent, pagesCount, pagesNums);
        }
        if (buttonId !== "previousPage" && buttonId !== "nextPage") {
            currentPage.focus();
        }
        let firstQuestionId = (pagesNums.currentPage - 1) * questionsPerPage + 1;
        let lastQuestionId =
            Math.min(pagesNums.currentPage * questionsPerPage, questionsCount);
        if (lastQuestionId === 0) {
            firstQuestionId = 0;
        }
        let paginationInfo = firstQuestionId + "-" + lastQuestionId + " of " + questionsCount;
        return {
            pagesNums, questionsIsAll, paginationInfo
        };
    }
}