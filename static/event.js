//
// events that happen in board view or card view
//
var boardEvents = function() {
    // boards
    $('.board-element').on("click", function(event){
        removeOtherBoards(event);
        boardGrow(event);
        localStorage.setItem('page_state', 'card-level');
        drawCards();
        cardEvents();
    });

    // switch adder to add boards
    $('#make-card').prop('id', "make-board");
    $('#make-board').on("click", function(event){
        drawNewBoard(event);
        boardEvents();
    });

};

var cardEvents = function() {
    // boards
    $('.back-to-boards').on("click", function(event){
        removeCards();
        removeBoards();
        localStorage.setItem('page_state', 'board-level');
        drawBoards();
        boardEvents();
    });

    // Open and close board menu
    $('#open-menu').on("click", function(event){
        $('#open-menu').prop('id', "close-menu");
        boardMenuOpen(event);
    });
    $('#close-menu').on("click", function(event){
        $('#close-menu').prop('id', "open-menu");
        boardMenuClose(event);
    });

    // board adder
    $('#make-board').prop('id', "make-card");
    $('#make-card').on("click", drawNewCard);
};

