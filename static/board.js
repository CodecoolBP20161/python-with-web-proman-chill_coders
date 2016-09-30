//
// Looks
//

// **** Board Object Constructor ****
function Board (id, title) {
    this.id = id;
    this.title = title;
    this.color = colorSelect(this);
    this.listOfCards = [];
}

// **** Board object to html builder ****
var buildBoard = function(board_object) {
    var board_html = '<div class="board-element" id="' +
                     board_object.id + '">' +
                     '<div class="board-show">' +
                     '<div class="thumbnail tile tile-medium ' + board_object.color + '">' +
                     '<h1 class="tile-text"> ' + board_object.title + ' </h1>' +
                     '</div>' +
                     '</div>' +
                     '<div class="board-edit">' +
                     '<div class="thumbnail tile tile-wide ' + board_object.color + '">' +
                     '<h1 class="tile-text">' + board_object.title + '</h1>' +
                     '<span class="fa fa-fw fa-4x fa-arrow-circle-left back-to-boards"></span>' +
                     '<span class="fa fa-fw fa-4x fa-gear" id="open-menu"></span>' +
                     '</div>' +
                     '</div>' +
                     '<div class="board-menu">' +
                     '<div class="thumbnail tile tile-large ' + board_object.color + '">' +
                     '<h1 class="tile-text">' + board_object.title + '</h1>' +
                     '<span class="fa fa-fw fa-4x fa-arrow-circle-left back-to-boards"></span>' +
                     '<span class="fa fa-fw fa-4x fa-gear" id="close-menu"></span>' +
                     '<h1 class="tile-text" id="close-menu">This is where menu items will be when implemented</h1>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
    return board_html
};

// **** Displaying boards --- loading data from storage place ****
var drawBoards = function() {
    var page_state = localStorage.getItem('page_state');
    if (page_state === 'board-level') {
        var listOfData = storage.state.loadData();
        for (var i = 0; i < listOfData.length; i++) {
            $('.board-list').append(buildBoard(listOfData[i]));
        }
    }
    else if (page_state === 'card-level') {
        var current = JSON.parse(localStorage.getItem('current_board'));
        $('.board-list').append(buildBoard(current));
        $( '.board-element' ).children('.board-show').hide(0, function () {
            $(this).next().fadeIn(50);
        });
    }
};


// **** Select Color for boards based on board id ****
var colorSelect = function(object) {
    var board_color = "tile-pink";
    switch (object.id % 7) {
        case 0:
            board_color = "tile-green";
            break;
        case 1:
            board_color = "tile-yellow";
            break;
        case 2:
            board_color = "tile-purple";
            break;
        case 3:
            board_color = "tile-red";
            break;
        case 4:
            board_color = "tile-orange";
            break;
        case 5:
            board_color = "tile-blue";
            break;
        case 6:
            board_color = "tile-pink";
            break;
        default:
            board_color = "tile-pink";
            break;
    }
    return board_color
};

// **** Remove all boards ****
function removeBoards() {
    $('.board-element').remove();
}

// **** removes other boards and saves current board object to localStorage ****
function removeOtherBoards(event) {
    localStorage.setItem('page_state', 'card-level');
    var element = $( event.target ).closest('.board-element');
    removeBoards();
    $('.board-list').append(element);
    // saves current board to localStorage
    var cur_board = getBoardObject(element);
    localStorage.setItem('current_board', JSON.stringify(cur_board));
    localStorage.setItem('page_state', 'card-level');

}

// **** Gets board object from local storage for a board node ****
function getBoardObject(element) {
    var board_id = parseInt(element.attr('id'), 10);
    var board_list = storage.state.loadData();
    for (var i = 0; i<board_list.length; i++) {
        if (board_list[i].id === board_id) {
            return board_list[i];
        }
    }
}

// **** Change board tile to wide ****
function boardGrow(event) {
    var element = $( event.target ).closest('.board-element');
    element.children('.board-show').hide(0, function () {
        $(this).next().fadeIn(300);
    });
};

// **** Open a board's menu ****
function boardMenuOpen(event) {
    var element = $( event.target ).closest('.board-element');
    element.children('.board-edit').hide(0, function () {
        $(this).next().fadeIn(300);
    });
};

// **** Close a board's menu ****
function boardMenuClose(event) {
    var element = $( event.target ).closest('.board-element');
    element.children('.board-menu').hide(0, function () {
        $(this).prev().fadeIn(300);
    });
};