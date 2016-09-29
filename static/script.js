// ProMan Web application
// By Chill_coders (Ádám, Andris, Dóri, Levi, Misi)
// According to State Pattern design


// **** MAIN ****
function main(storage) {
    $(document).ready(function () {
        // displaying boards --- loading data from storage place
        drawBoards(storage);

        // adding new boards to DB and also displaying
        drawNewBoard(storage);

        // effects for boards
        boardEffects();

        // effects for new board
        newBoardEffects();
    });
}


// for Implementation1
var fromStorage = new State(new LocalStorageManager('list_of_boards'));
main(fromStorage);
// for Implementation2
// fromStorage.changeState(Sprint2Stuff());
// main(fromStorage);


