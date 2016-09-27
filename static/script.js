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
    this.rawData = localStorage;
    this.listOfBoards = [];

    this.loadData = function() {
        for (var i = 0; i < localStorage.length; i++) {
            this.listOfBoards.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
        return this.listOfBoards
    };

    this.saveData = function (boardObj) {
        var element = localStorage.setItem('board_' + (boardObj.id).toString(), JSON.stringify(boardObj));
        this.listOfBoards.push(element);
    };
}


// **** MAIN ****
function main(storage) {
    $(document).ready(function () {
        // localStorage.clear();

        // displaying boards --- loading data from storage place
        storage.state.loadData();
        for (var i = 0; i < storage.state.rawData.length; i++) {
            $('div').append('<p>' + storage.state.listOfBoards[i].title + '</p>');
        }
        
        // adding new boards to DB and also displaying
        $('#add').click(function () {
            var toAdd = $("input[name=board]").val();
            $('div').append("<p>" + toAdd + "</p>");
            var board = new Board((storage.state.listOfBoards.length) + 1, toAdd);
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


// - leellenőriztetni valamelyik mentorral
// - displaying kiszervezése --- hogyan?



