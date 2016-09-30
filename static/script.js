// ProMan Web application
// By Chill_coders (Ádám, Andris, Dóri, Levi, Misi)
// According to State Pattern design


// **** MAIN ****
function main() {
    $(document).ready(function () {
        // initialize page state
        var page_state = state_initializer();

        if (page_state === 'board-level') {
            drawBoards();
            boardEvents();
        }
        else if (page_state === 'card-level') {
            drawBoards();
            drawCards();
            cardEvents();
        }
        newBoardEffects();
    });
}


// **** Initialization for reloading ****
function state_initializer() {
    var page_state = localStorage.getItem('page_state');
    if (page_state === null) {
        page_state = 'board-level';
        localStorage.setItem('page_state', 'board-level');
    }
    return page_state
}



main();
