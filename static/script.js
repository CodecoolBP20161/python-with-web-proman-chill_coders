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
}


// **** Implementation1 --- with browser's localStorage ****
function LocalStorageManager() {
    this.listOfBoards = [];
    this.numOfBoards = this.listOfBoards.length;

    this.loadData = function() {
        for (var i = 0; i < localStorage.length; i++) {
            this.listOfBoards.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        return this.listOfBoards
    };

    this.saveData = function (boardObj) {
        localStorage.setItem('board_' + (boardObj.id).toString(), JSON.stringify(boardObj));
    };
}


// **** MAIN ****
function main() {
    $(document).ready(function () {
        // localStorage.clear();

        var storage = new State(new LocalStorageManager());

        // displaying boards
        for (var i = 0; i < storage.numOfBoards; i++) {
            $('div').append('<p>' + storage.listOfBoards[i].title + '</p>');
        }
        
        // adding new boards
        $('#add').click(function () {
            var toAdd = $("input[name=board]").val();
            $('div').append("<p>" + toAdd + "</p>");
            var board = new Board((storage.numOfBoards) + 1, toAdd);
            storage.saveData(board);
        });
    });
}


// for Implementation1
// var fromLocalStore = new State(new LocalStorageManager());
main();
// for Implementation2
// x.changeState(Sprint2Stuff());
// main(X);




