//
// **** State Settings ****
//

// **** State Object Constructor ****
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


// **** Implementation1 --- with browser's localStorage ****
function LocalStorageManager(keyword) {
    this.keyword = keyword;
    // localStorage.clear();

    // loading data from localStorage
    this.loadData = function() {
        var listOfObjects = JSON.parse(localStorage.getItem(this.keyword));
        if (listOfObjects === null)
            listOfObjects = [];
        return listOfObjects;
    };

    // saves data into localStorage
    this.saveData = function (board, card) {
        console.log(card, ' inside storage');
        var listOfObjects = this.loadData();
        if (typeof(card) === 'undefined') {
            console.log('inside if');
            listOfObjects.push(board);
        }
        else {
            console.log('inside else');
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
