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
function LocalStorageManager(keyword) {
    this.keyword = keyword;
    // localStorage.clear();

    // loading data from localStorage
    this.loadData = function() {
        return JSON.parse(localStorage.getItem(this.keyword));
    };

    // saves data into localStorage
    this.saveData = function (obj) {
        // localStorage.clear();
        var listOfObjects = this.loadData();
        if (listOfObjects === null) {
            listOfObjects = [];
        }
        listOfObjects.push(obj);
        localStorage.setItem(this.keyword, JSON.stringify(listOfObjects));

    };
}


// **** MAIN ****
function main(storage) {
    $(document).ready(function () {
        // localStorage.clear();

        // displaying boards --- loading data from storage place
        var listOfData = storage.state.loadData();
        if (listOfData === null) {
            listOfData = [];
        }
        for (var i = 0; i < listOfData.length; i++) {
            $('div').append('<p>' + listOfData[i].title + '</p>');
        }

        // adding new boards to DB and also displaying
        $('#add').click(function () {
            var toAdd = $("input[name=board]").val();
            $('div').append("<p>" + toAdd + "</p>");
            var board = new Board(listOfData.length, toAdd);
            storage.state.saveData(board);

        });
    });
}


// for Implementation1
var fromStorage = new State(new LocalStorageManager('list_of_boards'));
main(fromStorage);
// for Implementation2
// fromStorage.changeState(Sprint2Stuff());
// main(fromStorage);


