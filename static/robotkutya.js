var buildBoard = function(board_object) {
    var board_html = '<div class="thumbnail tile tile-medium ' +
        board_object.color +
        ' "><h1 class="tile-text">' +
        board_object.title +
        '</h1></div>';
    return board_html
};

var colorSelect = function(object) {
    var board_color = "tile-pink";
    switch (object.id % 7) {
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
