
// functional events that happen to boards and cards and the adder tile
var boardEvents = function() {drawCards()
    $('.board-element').on("click", removeOtherBoards);
    $('.board-element').on("click", boardGrow);
    $('.board-element').on("click", drawCards);
};

var newBoardEvents = function() {
    $('#make-board').on("click", drawNewBoard);
    $('#make-card').on("click", drawNewCard);
    $('#back-to-boards').on("click", removeCards);
    $('#back-to-boards').on("click", boardShrink);
    $('#back-to-boards').on("click", drawBoards);
};

// removes other boards and saves current board object to localStorage
function removeOtherBoards(event) {
    var element = $( event.target ).closest('.board-element');
    $('.board-element').remove();
    $('.board-list').append(element);
    // changes to adder
    $('#make-board').off("click");
    $('#make-board').prop('id', "make-card");
    $('#make-card').on("click", drawNewCard);
    // saves current board to localStorage
    var cur_board = getBoardObject(element);
    localStorage.setItem('current_board', JSON.stringify(cur_board));
    localStorage.setItem('page_state', 'card-level');

}

// grow to wide when clicked on
function boardGrow(event) {
    var element = $( event.target ).closest('.board-element');
    element.children('.board-show').hide(0, function () {
        $(this).next().fadeIn(50);
        $('#back-to-boards').on("click", removeCards)
    });
};

// shrink back when clicked on boards button
function boardShrink(event) {
    var element = $( event.target ).closest('.board-element');
    element.children('.board-edit').hide(0, function () {
        $(this).prev().fadeIn(50);
        $('#back-to-boards').off("click")
    });
};

// gets board object from local storage for a board node
function getBoardObject(element) {
    var board_id = parseInt(element.attr('id'), 10);
    var board_list = storage.state.loadData();
    for (var i = 0; i<board_list.length; i++) {
        if (board_list[i].id === board_id) {
            return board_list[i];
        }
    }
}

function removeCards() {
    $('.card-element').remove();
    $('#make-card').off("click");
    $('#make-card').prop('id', "make-board");
    $('#make-board').on("click", drawNewBoard);
    localStorage.setItem('page_state', 'board-level');


}