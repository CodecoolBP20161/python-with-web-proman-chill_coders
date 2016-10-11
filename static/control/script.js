// ProMan Web application
// By Chill_coders (Ádám, Andris, Dóri, Levi, Misi)
// According to State Pattern design


// **** State settings ****
// for Implementation1
var storage = new State(new LocalStorageManager('listOfBoards'));
// for Implementation2
// storage.changeState(new DatabaseStorageManager());

// **** MAIN ****
function main() {
    $(document).ready(function () {
        // initialize page state
        var pageState = stateInitializer();

        if (pageState === 'board-level') {
            drawBoards();
            boardEvents();
        }
        else if (pageState === 'card-level') {
            drawBoards();
            drawCards();
            cardEvents();
        }
        newBoardEffects();
    });
}


main();
