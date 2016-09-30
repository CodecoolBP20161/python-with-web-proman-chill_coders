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
                     '<i class="fa fa-4x fa-trello" id="back-to-boards"></i>' +
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