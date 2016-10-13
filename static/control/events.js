//
// **** PAGE EVENTS ****
//

// load the page when we reach the website
function loadPage() {

        var pageState = stateInitializer();

        if (pageState === 'board-level') {
            drawBoards();
            setBoardLevel();
            setBoardAdder()

        }
        else if (pageState === 'card-level') {
            drawBoards();
            drawCards();
            setCardLevel();
            setCardAdder()
        }

        setBoardAdder();
        newBoardEvents();
}


//
// **** ADDER  ****
//
// Set the adder to add boards
function setBoardAdder() {
    var pageState = stateInitializer();
    if (pageState === 'board-level') {
        $('#make-new').off();
        $('#make-new').on("click", function(event){
            if (newBoard.changed) {
                drawNewBoard(event);
            }
        })
    }
}


// Set the adder to add cards
function setCardAdder() {
    var pageState = stateInitializer();
    if (pageState === 'card-level') {
        $('#make-new').off()
        $('#make-new').on("click", function (event) {
            drawNewCard(event)
        })
    }
}


// **** Events for add new board tile ****
var newBoardEvents = function() {
    $('#new-board-tile').off();

    $('#new-board-tile').mouseenter(function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();

        $(this).children('#title-default').fadeOut(200); // why doesn't this work?
        $(this).children('#adder-content').empty();
        $(this).children('#adder-content').append(newBoard.edit).children('#title-input').hide().fadeIn(400);

        setBoardAdder();
        getPlaceholder();

        $(this).keyup(function (event) {
            savePlaceholder(event);
        });
        });

    $('#new-board-tile').mouseleave(function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        savePlaceholder(event);

        $(this).children('#title-input').fadeOut(200); // why doesn't this work?
        $(this).children('#adder-content').empty();
        $(this).children('#adder-content').append(newBoard.show).children('#title-default').hide().fadeIn(400);
        $(this).off("keyup");
    });
};


var savePlaceholder = function (event) {
    var placeholder = $('#title-input').val();
    if (0 < placeholder.length) {
        newBoard.changed = true;
        newBoard.placeholder = placeholder;
        if ( event.which == 13 ) {
            drawNewBoard(event);
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
    boardGrow(event);
    localStorage.setItem('pageState', 'card-level');
};


//
// **** CARD LEVEL ****
//
// find all card nodes and add events to it, find the single board element and add events to it
function setCardLevel() {
    $( '.card-element' ).off();
    $( '.card-element' ).on("click", function (event) {
        cardEvents(event);
    });
    $( '.board-element' ).off();
    $( '.board-element' ).on("click", function (event) {
        boardEventsCL(event);
    });
}


// add events to the board node
function boardEventsCL () {
    // boards
    $('.back-to-boards').on("click", function(event){
        removeCards();
        removeBoards();
        localStorage.setItem('pageState', 'board-level');
        loadPage();
    });

    // Open and close board menu
    $('#open-menu').on("click", function(event){
        $('#open-menu').prop('id', "close-menu");
        boardMenuOpen(event);
    });
    $('#close-menu').on("click", function(event){
        $('#close-menu').prop('id', "open-menu");
        boardMenuClose(event);
    });
};

