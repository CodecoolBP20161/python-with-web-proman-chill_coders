function Board (title) {
    this.title = title
}


$(document).ready(function() {
    // localStorage.clear();
    console.log(localStorage);
    for (var i = 0; i < localStorage.length; i++) {
        console.log(localStorage.getItem('board' + i));
        var board = JSON.parse(localStorage.getItem('board' + i));
        console.log(board);
        $('div').append("<p>" + board.title + "</p>");
    }

    $('button').click(function () {
        var toAdd = $("input[name=board]").val();
        $('div').append("<p>" + toAdd + "</p>");
        var board = new Board(toAdd);
        localStorage.setItem('board' + i, JSON.stringify(board));
    });

    $('p').hover(
        function () {
            $(this).addClass('active');
        },
        function () {
            $(this).removeClass('active');
        });
});




