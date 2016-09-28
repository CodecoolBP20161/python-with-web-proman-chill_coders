var board_counter = 0

var Board = function(title) {
    this.title = title
};

$(document).ready(function() {
   $('.old-board').click(function() {
       $(this).toggle(100);
   });
   $('.new-board').click(function() {
       $( ".board-list" ).append( "<div class=\"thumbnail tile tile-medium tile-pink\"><h1 class=\"tile-text\">Title</h1> </div>" );
   });
});