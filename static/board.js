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
                     '<h1 class="tile-text"> Cards</h1>' +
                     '<i class="fa fa-4x fa-trello"></i>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
    return board_html
};

// **** Displaying boards --- loading data from storage place ****
var drawBoards = function(storage, hova) {
    var listOfData = storage.state.loadData();
    for (var i = 0; i < listOfData.length; i++) {
        $('.board-list').append(buildBoard(listOfData[i]));
    }
};

// **** Draw new board and save to db ****
var drawNewBoard = function(storage) {
    $('#make-board').click(function () {
        var listOfData = storage.state.loadData();
        var toAdd = $('#title-input').val();
        if (0 < toAdd.length) {
            var board = new Board(listOfData.length, toAdd);
            $('.board-list').append(buildBoard(board));
            $('.board-list').last().on("click", boardGrow);
            $('#title-input').val('');
            storage.state.saveData(board);
        }
    });
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


// **** Effects for boards ****

// grow to wide when clicked on
function boardGrow(event) {
    var element = $( event.target ).closest('.board-element');
    element.children('.board-show').hide(0, function () {
            $(this).next().fadeIn(50);
        });
};

// effects collection
var boardEffects = function() {

    $('.board-element').on("click", boardGrow);

    // later effects
    /*$('.board-element').mouseenter(function () {
        $(this).children('.board-show').hide(0, function () {
            $(this).next().fadeIn(50);
        });
    });
    $('.board-element').mouseleave(function () {
        $(this).children('.board-edit').hide(0, function () {
            $(this).prev().fadeIn(50);
        })
    });*/
};

// effects for add new board tile
var newBoardEffects = function() {
    $('#new-board-tile').mouseenter(function () {
        $(this).children('#show').hide();
        $(this).children('#edit').show();
        $('#title-input').hide();
        $('#title-input').fadeIn(100).focus();
    });
    $('#new-board-tile').mouseleave(function () {
        $('#edit').hide(0, function () {
            $('#show').show(0);
        });
    });
};