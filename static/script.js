// proxy
function Board (title) {
    this.id = localStorage.length + 1;
    this.title = title;
    this.save_data = function (data, keyword) {
        localStorage.setItem(keyword + '_' + data["id"], JSON.stringify(data));
    };
}


$(document).ready(function() {
    // localStorage.clear();

    for (var i = 1; i < localStorage.length; i++) {
        var board = JSON.parse(localStorage.getItem('board' + '_' + i));
        $('div').append('<p>' + board.title + '</p>')
    }

    $('button').click(function () {
        var toAdd = $("input[name=board]").val();
        $('div').append("<p>" + toAdd + "</p>");
        var board = new Board(toAdd);
        board.save_data(board, 'board');
    });
});




