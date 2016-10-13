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
        if (filter_id) {
            $.getJSON('http://0.0.0.0:5000/api/' + filter_id.toString() + '/cards', function (response) {
                var listOfCards = response.list_of_cards;
                if (listOfCards === null) {
                    return []
                }
                console.log(listOfCards);
                return listOfCards;
            });
        }
        else if (typeof(filter_id) === 'undefined') {
            if (option == 'boards') {
                var response = $.ajax({
                    type: 'GET',
                    url: '/api/boards',
                    dataType: 'json',
                    async: false
                });
                return response.responseJSON.list_of_boards
            }
        }
    }
    this.saveData = function (board, card) {
        // var listOfObjects = this.loadData('boards');
        var my_json;
        var url_str = "/api/";
        if (typeof(card) === 'undefined') {
            my_json = {json_str: board};
            url_str += "newboard";
        }
        else {
            card.owner = board.id;
            my_json = {json_str: card};
            url_str += "newcard"
        }
        $.ajax({
            type : "POST",
            url : url_str,
            data: JSON.stringify(my_json),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}


// for Implementation2
//storage.changeState(new DatabaseStorageManager());
// console.log(storage.state.loadData('page_level'));
// storage.changeState(new LocalStorageManager('list_of_boards'));
