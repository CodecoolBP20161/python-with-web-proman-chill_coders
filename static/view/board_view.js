// **** Board object to html builder ****
var BoardView = function (boardObject, option) {

    this.dragSet = function (option) {
        if (option === 'drag') {
            this.setting = 'li';
        } else {
            this.setting = 'div';
        }
    };

    this.dragSet(option);
    //this.setting = this.dragSet(option);

    this.boardHtml = '<' + this.setting + ' class="board-element" id="' +
        boardObject.id + '">' +
        '<div class="board-show">' +
        '<div class="thumbnail tile tile-medium ' + boardObject.color + '">' +
        '<h1 class="tile-text"> ' + boardObject.title + ' </h1>' +
        '</div>' +
        '</div>' +
        '<div class="board-edit">' +
        '<div class="thumbnail tile tile-wide ' + boardObject.color + '">' +
        '<h1 class="tile-text">' + boardObject.title + '</h1>' +
        '<span class="fa fa-fw fa-4x fa-arrow-circle-left back-to-boards"></span>' +
        '<span class="fa fa-fw fa-4x fa-gear" id="open-menu"></span>' +
        '</div>' +
        '</div>' +
        '<div class="board-menu">' +
        '<div class="thumbnail tile tile-large ' + boardObject.color + '">' +
        '<h1 class="tile-text">' + boardObject.title + '</h1>' +
        '<span class="fa fa-fw fa-4x fa-arrow-circle-left back-to-boards"></span>' +
        '<span class="fa fa-fw fa-4x fa-gear" id="close-menu"></span>' +
        '<h1 class="tile-text" id="close-menu">This is where menu items will be when implemented</h1>' +
        '</div>' +
        '</div>' +
        '</' + this.setting + '>';
};


// **** Displaying boards --- loading data from storage place ****
var drawBoards = function () {
    var pageState = localStorage.getItem('pageState');
    if (pageState === 'board-level') {
        var listOfData = storage.state.loadData('boards');
        for (var i = 0; i < listOfData.length; i++) {
            var newBoard = new BoardView(listOfData[i], 'drag');
            $('.board-list').append(newBoard.boardHtml);
        }
    }
    else if (pageState === 'card-level') {
        var current = JSON.parse(localStorage.getItem('currentBoard'));
        var newBoard = new BoardView(current, 'nodrag');
        $('.board-list').append(newBoard.boardHtml);
        $('.board-element').children('.board-show').hide(0, function () {
            $(this).next().fadeIn(400);
        });
    }
};


// **** Draw new-board object and save to db ****
var drawNewBoard = function(event) {
    event.preventDefault();
    var listOfData = storage.state.loadData('boards');
    var toAdd = $('#title-input').val();
    if (0 < toAdd.length) {
        var board = new Board(listOfData.length, toAdd);
        storage.state.saveData(board);
        var newBoard = new BoardView(board, 'drag');
        $('.board-list').append(newBoard.boardHtml);
        $( '.board-element' ).last().on("click", function (event) {
            boardEventsBL(event);
        });
        $( '.board-element' ).last().hide().fadeIn(400);
        resetPlaceholder();
    }
};



// **** Remove all boards ****
function removeBoards() {
    $('.board-element').remove();
}


// **** removes other boards and saves current board object to localStorage ****
function removeOtherBoards(event) {
    localStorage.setItem('pageState', 'card-level');

    // saves current board to localStorage
    var element = $(event.target).closest('.board-element');
    var curBoard = getBoardObject(element);
    localStorage.setItem('currentBoard', JSON.stringify(curBoard));
    localStorage.setItem('pageState', 'card-level');

    // redraw the current board
    removeBoards();
    var current = JSON.parse(localStorage.getItem('currentBoard'));
    var newBoard = new BoardView(current, 'nodrag');
    $('.board-list').append(newBoard.boardHtml);
    $('.board-element').last().find('.board-show').hide(0, function () {
        $(this).next().fadeIn(300);
    });


}


// **** Open a board's menu ****
function boardMenuOpen(event) {
    var element = $(event.target).closest('.board-element');
    element.children('.board-edit').hide();
    element.children('.board-menu').show();
}


// **** Close a board's menu ****
function boardMenuClose(event) {
    var element = $(event.target).closest('.board-element');
    element.children('.board-menu').hide();
    element.children('.board-edit').show();
}


// **** Select Color for boards based on board id ****
var colorSelect = function (object) {
    var boardColor = "tile-pink";
    switch (object.id % 7) {
        case 0:
            boardColor = "tile-green";
            break;
        case 1:
            boardColor = "tile-yellow";
            break;
        case 2:
            boardColor = "tile-purple";
            break;
        case 3:
            boardColor = "tile-red";
            break;
        case 4:
            boardColor = "tile-orange";
            break;
        case 5:
            boardColor = "tile-blue";
            break;
        case 6:
            boardColor = "tile-pink";
            break;
        default:
            boardColor = "tile-pink";
            break;
    }
    return boardColor
};