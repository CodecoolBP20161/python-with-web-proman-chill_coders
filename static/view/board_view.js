// **** Board object to html builder ****
var BoardView = function (boardObject) {
    var boardHtml = '<li class="board-element" id="' +
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
        '</li>';
    return boardHtml
};


// **** Displaying boards --- loading data from storage place ****
var drawBoards = function () {
    var pageState = localStorage.getItem('pageState');
    if (pageState === 'board-level') {
        var listOfData = storage.state.loadData();
        for (var i = 0; i < listOfData.length; i++) {
            $('.board-list').append(BoardView(listOfData[i]));
        }
    }
    else if (pageState === 'card-level') {
        var current = JSON.parse(localStorage.getItem('currentBoard'));
        $('.board-list').append(BoardView(current));
        $('.board-element').children('.board-show').hide(0, function () {
            $(this).next().fadeIn(50);
        });
    }
};


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


// **** Remove all boards ****
function removeBoards() {
    $('.board-element').remove();
}


// **** removes other boards and saves current board object to localStorage ****
function removeOtherBoards(event) {
    localStorage.setItem('pageState', 'card-level');
    var element = $(event.target).closest('.board-element');
    removeBoards();
    $('.board-list').append(element);
    // saves current board to localStorage
    var curBoard = getBoardObject(element);
    localStorage.setItem('currentBoard', JSON.stringify(curBoard));
    localStorage.setItem('pageState', 'card-level');
}


// **** Change board tile to wide ****
function boardGrow(event) {
    var element = $(event.target).closest('.board-element');
    element.children('.board-show').hide(0, function () {
        $(this).next().fadeIn(300);
    });
};


// **** Open a board's menu ****
function boardMenuOpen(event) {
    var element = $(event.target).closest('.board-element');
    element.children('.board-edit').hide(0, function () {
        $(this).next().fadeIn(300);
    });
};


// **** Close a board's menu ****
function boardMenuClose(event) {
    var element = $(event.target).closest('.board-element');
    element.children('.board-menu').hide(0, function () {
        $(this).prev().fadeIn(300);
    });
};

$(function () {
    $("ul").sortable({
        items: 'li',
        dropOnEmpty: false,
        scroll: false,
        update: function (event, ui) {
            var order = $($this).sortable('serialize');
            console.log(order)
        },
        helper: 'clone',
        zIndex: 9999,
        tolerance: 'pointer',
        placeholder: 'placeholder thumbnail tile tile-medium',
        forceHelperSize: true});
});