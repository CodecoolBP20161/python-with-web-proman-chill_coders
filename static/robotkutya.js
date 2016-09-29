var board_counter = 0;

var Board = function(title) {
    this.title = title
    this.color = ""
};


var newBoard = function() {
    var title = $('#title-input').val();
    var new_board = new Board(title);
    new_board.color = colorSelect();
    board_counter++;
    return new_board
}

var buildBoard = function(board_object) {
    var board_html = '<div class="board-element">' +
                     '<div class="board-show">' +
                     '<div class="thumbnail tile tile-medium ' + board_object.color + '">' +
                     '<h1 class="tile-text"> ' + board_object.title + ' </h1>' +
                     '</div>' +
                     '</div>' +
                     '<div class="board-edit">' +
                     '<div class="thumbnail tile tile-medium ' + board_object.color + '">' +
                     '<h1 class="tile-text"> Cards</h1>' +
                     '<i class="fa fa-4x fa-trello"></i>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
    return board_html
}

var colorSelect = function() {
    var board_color = "tile-pink"
    switch (board_counter % 7) {
        case 0:
            board_color = "tile-green"
            break;
        case 1:
            board_color = "tile-yellow"
            break;
        case 2:
            board_color = "tile-purple"
            break;
        case 3:
            board_color = "tile-red"
            break;
        case 4:
            board_color = "tile-orange"
            break;
        case 5:
            board_color = "tile-blue"
            break;
        case 6:
            board_color = "tile-pink"
            break;
        default:
            board_color = "tile-pink"
            break;
    }
    return board_color
}


$(document).ready(function() {
    $('#make-board').click(function() {
        new_board = newBoard();
        html_string = buildBoard(new_board);
        $( '.board-list' ).append( html_string );
        $( '#title-input' ).val('')
    });

    $('.board-element').mouseenter(function() {
        $(this).children( '.board-show' ).fadeOut(150, function(){
            $(this).next().fadeIn(150);
        });
    });
    $('.board-element').mouseleave(function() {
        $(this).children( '.board-edit' ).fadeOut(150, function(){
            $(this).prev().fadeIn(150);
        })
    });

    $('#new-board-tile').mouseenter(function() {
        $(this).children( '#show' ).hide();
        $(this).children( '#edit' ).show();
        $( '#title-input' ).hide();
        $( '#title-input' ).fadeIn(300).focus();
    });
    $('#new-board-tile').mouseleave(function() {
        $( '#edit' ).hide(0, function(){
            $( '#show' ).show(0);
        });
    });

});

