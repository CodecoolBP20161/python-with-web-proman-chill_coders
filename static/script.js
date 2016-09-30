// ProMan Web application
// By Chill_coders (Ádám, Andris, Dóri, Levi, Misi)
// According to State Pattern design


// **** MAIN ****
function main() {
    $(document).ready(function () {
        // initialize page state
        state_initializer()
        // displaying boards --- loading data from storage place
        drawBoards();
        drawCards();

        // events for boards, cards and the adder tile
        boardEvents();
        newBoardEvents();

        // visual effects
        newBoardEffects();
    });
}


// **** Initialization for reloading ****
function state_initializer() {
/*    var page_state = localStorage.getItem('page_state');
    if (typeof(page_state) === 'undefined') {
        localStorage.setItem('page_state', JSON.stringify('board-level'));
        console.log('thisisit')
    }*/
    localStorage.setItem('page_state', 'board-level');
}

// board-level if in drawBoard



main();
