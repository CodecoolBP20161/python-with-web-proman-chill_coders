// ProMan Web application
// By Chill_coders (Ádám, Andris, Dóri, Levi, Misi)
// According to State Pattern design


// **** State Object Constructor****
function State (state) {
    this.state = state;

    this.changeState = function (state) {
        this.state = state
    };

    this.loadData = function() {
        this.state.loadData()
    };

    this.saveData = function(data) {
        this.state.saveData(data)
    };
}


// **** Board Object Constructor ****
function Board (id, title) {
    this.id = id;
    this.title = title;
    this.listOfCards = [];
}

// **** Card Object Constructor ****
function Card (id, owner, title) {
    this.id = id;
    this.owner = owner;
    this.title = title;
}


// **** Implementation1 --- with browser's localStorage ****
function LocalStorageManager() {
    // loading data from localStorage
    this.loadData = function() {
        return JSON.parse(localStorage.getItem('list_of_boards'));
    };

    // sets listOfBoards attribute
    if (localStorage.length == 0) {
        this.listOfBoards = [];
    }
    else {
        this.listOfBoards = this.loadData();
    }

    // saves data into localStorage
    this.saveData = function (boardObj) {
        this.listOfBoards.push(boardObj);
        localStorage.setItem('list_of_boards', JSON.stringify(this.listOfBoards));
    };
}


// **** MAIN ****
function main(storage) {
    $(document).ready(function () {
        // localStorage.clear();

        // displaying boards --- loading data from storage place
        for (var i = 0; i < storage.state.listOfBoards.length; i++) {
            $('div').append('<p>' + storage.state.listOfBoards[i].title + '</p>');
        }

        // adding new boards to DB and also displaying
        $('#add').click(function () {
            var toAdd = $("input[name=board]").val();
            $('div').append("<p>" + toAdd + "</p>");
            var board = new Board(storage.state.listOfBoards.length, toAdd);
            storage.state.saveData(board);
        });
    });
}


// for Implementation1
var fromStorage = new State(new LocalStorageManager());
main(fromStorage);
// for Implementation2
// fromStorage.changeState(Sprint2Stuff());
// main(fromStorage);


