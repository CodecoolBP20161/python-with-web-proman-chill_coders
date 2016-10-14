//
// **** State Settings ****
//
// for Implementation1
var storage = new State(new LocalStorageManager('listOfBoards'));
// for Implementation2
// storage.changeState(new DatabaseStorageManager());


// **** State Object Constructor ****
function State(state) {
    this.state = state;

    this.changeState = function (state) {
        this.state = state
    };

    this.loadData = function (option, filterId) {
        this.state.loadData(option, filterId)
    };

    this.saveData = function (data) {
        this.state.saveData(data)
    };
}


// **** Implementation1 --- with browser's localStorage ****
function LocalStorageManager(keyword) {
    this.keyword = keyword;

    // loading data from localStorage
    this.loadData = function (option, filterId) {
        if (filterId) {
            var listOfObjects = JSON.parse(localStorage.getItem(this.keyword));
            if (listOfObjects === null)
                listOfObjects = [];
            return listOfObjects;
        }
        else if (typeof(filterId) === 'undefined') {
            if (option == 'boards') {
                var listOfObjects = JSON.parse(localStorage.getItem(this.keyword));
                if (listOfObjects === null)
                    listOfObjects = [];
                return listOfObjects;
            }
            else if (option == 'pageState') {
                var pageState = localStorage.getItem('pageState');
                return pageState;
            }
            else if (option == 'currentBoard') {
                var currentBoard = JSON.parse(localStorage.getItem('currentBoard'));
                return currentBoard;
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
            localStorage.setItem('currentBoard', JSON.stringify(board));
        }
        localStorage.setItem(this.keyword, JSON.stringify(listOfObjects));
    };
}


// **** Implementation2 --- with database in the background ****
function DatabaseStorageManager() {

    // loading data from database
    this.loadData = function (option, filterId) {
        if (filterId) {
            $.getJSON('http://0.0.0.0:5000/api/' + filterId.toString() + '/cards', function (response) {
                var listOfCards = response.listOfCards;
                if (listOfCards === null) {
                    return []
                }
                return list_of_cards;
            });
        }
        else if (typeof(filterId) === 'undefined') {
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
    };
    
    // saving data into database
    this.saveData = function (board, card) {
        var myJson;
        var urlStr = "/api/";
        if (typeof(card) === 'undefined') {
            myJson = {jsonStr: board};
            urlStr += "newboard";
        }
        else {
            card.owner = board.id;
            myJson = {jsonStr: card};
            urlStr += "newcard";
            board.listOfCards.push(card);
            localStorage.setItem('currentBoard', JSON.stringify(board));
        }
        $.ajax({
            type : "POST",
            url : urlStr,
            data: JSON.stringify(myJson),
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}
