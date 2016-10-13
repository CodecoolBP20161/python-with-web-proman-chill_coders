// **** Draw new-board object and save to db ****
var drawNewBoard = function(event) {
        var listOfData = storage.state.loadData('boards');
        var toAdd = $('#title-input').val();
        $('#title-input').val('');
        if (0 < toAdd.length) {
            var board = new Board(listOfData.length, toAdd);
            storage.state.saveData(board);
            $('.board-list').append(buildBoard(board));
        }
};

// **** Effects for add new board tile ****
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