//
// **** PAGE EVENTS ****
//

// load the page when we reach the website
function loadPage() {

        var pageState = stateInitializer();

        if (pageState === 'board-level') {
            drawBoards();
            setBoardLevel();
            setAdder()

        }
        else if (pageState === 'card-level') {
            drawBoards();
            drawCards();
            boardEventsCL();
            setAdder()
        }

        newBoardEvents();
}


//
// **** ADDER  ****
//
// Set the adder to add boards
function setAdder() {
    var pageState = stateInitializer();

    $('#make-new').off();
    $('#make-new').on("click", function(event){
        if (newBoard.changed) {
            if (pageState === 'board-level') {
                drawNewBoard(event);
            } else if (pageState === 'card-level') {
                drawNewCard(event);
            }
        }
    });
}


// **** Events for add new board tile ****
var newBoardEvents = function() {
    $('#new-board-tile').off();

    $('#new-board-tile').mouseenter(function (event) {
        //event.preventDefault();
        //event.stopImmediatePropagation();

        $(this).find('#title-default').fadeOut(200, function () {
            $('#new-board-tile').find('#adder-content').empty();
            $('#new-board-tile').find('#adder-content').append(newBoard.edit);
            getPlaceholder();
            setAdder();
        });

        $(this).keyup(function (event) {
            savePlaceholder(event);
        });
        });

    $('#new-board-tile').mouseleave(function (event) {
        //event.preventDefault();
        //event.stopImmediatePropagation();
        $(this).find('#title-input').fadeOut(200, function(){
            $('#new-board-tile').find('#adder-content').empty();
            $('#new-board-tile').find('#adder-content').append(newBoard.show);
        });
        $(this).off("keyup");
    });
};


var savePlaceholder = function (event) {
    var pageState = stateInitializer();
    var placeholder = $('#title-input').val();
    if (0 < placeholder.length) {
        newBoard.changed = true;
        newBoard.placeholder = placeholder;
        if ( event.which == 13 ) {
            if (pageState === 'card-level') {
                drawNewCard(event);
            } else if (pageState === 'board-level') {
                drawNewBoard(event);
            }
        }
    }
};


var getPlaceholder = function () {
    if (newBoard.changed) {
        $('#title-input').val(newBoard.placeholder);
        $('#title-input').focus();
    } else {
        $('#title-input').val('');
        $('#title-input').focus();
    }
};


var resetPlaceholder = function () {
    $('#title-input').val('');
    newBoard.placeholder = 'New';
    newBoard.changed = false;
};


//
// **** BOARD LEVEL ****
//
// find all board nodes and add events to it
function setBoardLevel() {
    $( '.board-element' ).off();
    $( '.board-element' ).on("click", function (event) {
        boardEventsBL(event);
    });
}



// add events to a board node
function boardEventsBL (event) {
    removeOtherBoards(event);
    localStorage.setItem('pageState', 'card-level');
    drawCards();
    boardEventsCL();
}


//
// **** CARD LEVEL ****
//
// add events to the board node
function boardEventsCL (event) {
    // boards
    $('.back-to-boards').off();
    $('.back-to-boards').on("click", function(event){
        removeCards();
        removeBoards();
        localStorage.setItem('pageState', 'board-level');
        loadPage();
    });

    // Open and close board menu
    $('#open-menu').off();
    $('#open-menu').on("click", function(event){
        $('#open-menu').prop('id', "close-menu");
        boardMenuOpen(event);
    });
    $('#close-menu').off();
    $('#close-menu').on("click", function(event){
        $('#close-menu').prop('id', "open-menu");
        boardMenuClose(event);
    });
}

//
// **** DRAG AND DROP ****
//
// main function for Jquery UI
$(function () {
    $("ul").sortable({
        items: 'li',
        dropOnEmpty: false,
        scroll: false,
        helper: 'clone',
        zIndex: 9999,
        tolerance: 'pointer',
        placeholder: 'placeholder thumbnail tile tile-medium',
        forceHelperSize: true,
        update: function (event, ui) {
            var order = $("ul").sortable('toArray');
            console.log(order)
        }
    })
});