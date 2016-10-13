//
// **** State Settings ****
//
// for Implementation1
var storage = new State(new LocalStorageManager('list_of_boards'));
// for Implementation2
storage.changeState(new DatabaseStorageManager());


// **** State Object Constructor ****
function State(state) {
    this.state = state;

    this.changeState = function (state) {
        this.state = state
    };

    this.loadData = function (option, filter_id) {
        this.state.loadData(option, filter_id)
    };

    this.saveData = function (data) {
        this.state.saveData(data)
    };
}


// **** Implementation1 --- with browser's localStorage ****
function LocalStorageManager(keyword) {
    this.keyword = keyword;

    // loading data from localStorage
    this.loadData = function (option, filter_id) {
        if (filter_id) {
            var listOfObjects = JSON.parse(localStorage.getItem(this.keyword));
            if (listOfObjects === null)
                listOfObjects = [];
            return listOfObjects;
        }
        else if (typeof(filter_id) === 'undefined') {
            if (option == 'boards') {
                var listOfObjects = JSON.parse(localStorage.getItem(this.keyword));
                if (listOfObjects === null)
                    listOfObjects = [];
                return listOfObjects;
            }
            else if (option == 'page_state') {
                var page_state = localStorage.getItem('page_state');
                return page_state;
            }
            else if (option == 'current_board') {
                var current_board = JSON.parse(localStorage.getItem('current_board'));
                return current_board;
            }
        }
    };

    // saves data into localStorage
    this.saveData = function (board, card) {
        var listOfObjects = this.loadData('boards');
        if (typeof(card) === 'undefined') {
            listOfObjects.push(board);
        }
        else {
            for (var i = 0; i < listOfObjects.length; i++) {
                if (listOfObjects[i].id === board.id) {
                    board.listOfCards.push(card);
                    listOfObjects[i].listOfCards.push(card);
                }
            }
            localStorage.setItem('current_board', JSON.stringify(board));
        }
        localStorage.setItem(this.keyword, JSON.stringify(listOfObjects));
    };
}


// **** Implementation2 --- with database in the background ****
function DatabaseStorageManager() {

    // loading data from database
    this.loadData = function (option, filter_id) {
        console.log('2' + option);
        console.log('3' + filter_id);
        if (filter_id) {
            $.getJSON('http://0.0.0.0:5000/api/' + filter_id.toString() + '/cards', function (response) {
                var listOfCards = response.list_of_cards;
                return listOfCards;
            });
        }
        else if (typeof(filter_id) === 'undefined') {
            if (option == 'boards') {
                $.getJSON('http://0.0.0.0:5000/api/boards', function (response) {
                    var listOfBoards = response.list_of_boards;
                    return listOfBoards;
                });
            }
            else if (option == 'page_state') {
                $.getJSON('http://0.0.0.0:5000/api/page_state', function (response) {
                    var page_state = response.page_state;
                    console.log('4' + page_state + 'after getJSON');
                    return page_state;
                });
            }
            else if (option == 'current_board') {
                $.getJSON('http://0.0.0.0:5000/api/current_board', function (response) {
                    var current_board = response.current_board;
                    return current_board;
                });
            }
        }
    };
}


// // saves data into localStorage
// this.saveData = function () {
// };
// // IDE KELL IRÁNYÍTANI


// for Implementation2
storage.changeState(new DatabaseStorageManager());
// console.log(storage.state.loadData('page_level'));
// storage.changeState(new LocalStorageManager('list_of_boards'));
