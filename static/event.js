
// functional events that happen to boards and cards and the adder tile
var boardEvents = function() {
    // boards
    $('#back-to-boards').off("click");
    $('.board-element').off("click");
    $('.board-element').on("click", function(event){
        removeOtherBoards(event);
        boardGrow(event);
        localStorage.setItem('page_state', 'card-level');
        drawCards();
        cardEvents();
    });

    // switch adder to add boards
    $('#make-card').off("click");
    $('#make-card').prop('id', "make-board");
    $('#make-board').on("click", function(event){
        drawNewBoard(event);
        boardEvents();
    });

};

var cardEvents = function() {
    // boards
    $('#back-to-boards').on("click", function(event){
        removeCards();
        removeBoards();
        localStorage.setItem('page_state', 'board-level');
        drawBoards();
        boardEvents();
    });
    // board adder
    $('#make-board').off("click");
    $('#make-board').prop('id', "make-card");
    $('#make-card').on("click", drawNewCard);
};

