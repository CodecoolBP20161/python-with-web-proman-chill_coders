var board_counter = 0;

var Board = function(title) {
    this.title = title;
    this.color = ""
};


var newBoard = function() {
    var title = $('#title-input').val();
    var new_board = new Board(title);
    new_board.color = colorSelect();
    board_counter++;
    return new_board
};

var buildBoard = function(board_object) {
    var board_html = '<div class="thumbnail tile tile-medium ' +
        board_object.color +
        ' "><h1 class="tile-text">' +
        board_object.title +
        '</h1> </div>'
    return board_html
};

var colorSelect = function() {
    var board_color = "tile-pink";
    switch (board_counter % 7) {
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


$(document).ready(function() {
    $('#make-board').click(function() {
        new_board = newBoard();
        html_string = buildBoard(new_board);
        $( '.board-list' ).append( html_string );
        $( '#title-input' ).val('')
    });
    $('#new-board-tile').mouseenter(function() {
        $(this).children( '#edit' ).show();
        $(this).children( '#show' ).hide();
    });
    $('#new-board-tile').mouseleave(function() {
        $(this).children( '#edit' ).hide();
        $(this).children( '#show' ).show();
    });
});

/*$( '.new-board' ).hover(
  function() {
    console.log('IN')
    $( this ).append( '<input id="title-input" type="text" class="form-control" placeholder="Username">' );
  }, function() {
    console.log('OUT')
    $( this ).append( '<h3 class="tile-text">New Board</h3>' );
  }
);*/
/*$('ul li').on({
    'mouseenter':function(){
        $('#'+$(this).data('id')).fadeIn();
    },'mouseleave':function(){
        $('#'+$(this).data('id')).fadeOut();
    }
});*/