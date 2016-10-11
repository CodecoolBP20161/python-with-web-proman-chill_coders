// **** Gets board object from local storage for a board node ****
function getBoardObject(element) {
    var boardID = parseInt(element.attr('id'), 10);
    var boardList = storage.state.loadData();
    for (var i = 0; i < boardList.length; i++) {
        if (boardList[i].id === boardID) {
            return boardList[i];
        }
    }
}


// **** Initialization for reloading ****
function stateInitializer() {
    var pageState = localStorage.getItem('pageState');
    if (pageState === null) {
        pageState = 'board-level';
        localStorage.setItem('pageState', 'board-level');
    }
    return pageState
}