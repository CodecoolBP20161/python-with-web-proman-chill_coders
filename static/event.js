// board - card transition comes here

// grow to wide when clicked on
function boardGrow(event) {
    var element = $( event.target ).closest('.board-element');
    element.children('.board-show').hide(0, function () {
            $(this).next().fadeIn(50);
        });
};

// removes other boards and saves current board object to localStorage
function removeOtherBoards(event) {
    var element = $( event.target ).closest('.board-element');
    $('.board-element').remove();
    $('.board-list').append(element);
    // changes add button to card
    $('#make-board').prop('id', "make-card");
    // saves current board to localStorage
    var cur_board = getBoardObject(element);
    localStorage.setItem('current_board', JSON.stringify(cur_board));
}

// gets board object from local storage for a board node
function getBoardObject(element) {
    var board_id = parseInt(element.attr('id'), 10);
    var board_list = JSON.parse(localStorage.getItem('list_of_boards'));
    for (var i = 0; i<board_list.length; i++) {
        if (board_list[i].id === board_id) {
            return board_list[i];
        }
    }
}