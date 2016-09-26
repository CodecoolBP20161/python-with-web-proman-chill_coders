var list_of_boards = [];

function Board (title) {
    this.title = title
}

$(document).ready(function() {
    var fruits = ['barack', 'maracuja']
    for (var i = 0; i < fruits.length; i++) {
        $('div').append("<p>" + fruits[i] + "</p>");
    }
    $('button').click(function () {
        var toAdd = $("input[name=board]").val();
        $('div').append("<p>" + toAdd + "</p>");
        var board = new Board(toAdd);
        list_of_boards.push(board);
        console.log(list_of_boards);
        for (var i = 0; i < list_of_boards.length; i++) {
            console.log(list_of_boards[i].title);
            localStorage.setItem('board' + i, JSON.stringify(
                {title: list_of_boards[i].title}));
            console.log(JSON.parse(localStorage.getItem('board' + i)))
        }
    });
    $('p').hover(
        function () {
            $(this).addClass('active');
        },
        function () {
            $(this).removeClass('active');
        });
});




