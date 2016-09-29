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
    this.color = colorSelect(this);
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
        var listOfObjects = JSON.parse(localStorage.getItem(this.keyword));
        if (listOfObjects === null)
            listOfObjects = [];
        return listOfObjects;
    };

    // saves data into localStorage
    this.saveData = function (obj) {
        var listOfObjects = this.loadData();
        listOfObjects.push(obj);
        localStorage.setItem(this.keyword, JSON.stringify(listOfObjects));

    };
}


// **** MAIN ****
function main(storage) {
    $(document).ready(function () {
        
        // displaying boards --- loading data from storage place
        var listOfData = storage.state.loadData();
        for (var i = 0; i < listOfData.length; i++) {
            $('.board-list').append(buildBoard(listOfData[i]));
        }

        // adding new boards to DB and also displaying
        $('#make-board').click(function () {
            var listOfData = storage.state.loadData();
            var toAdd = $('#title-input').val();
            if  (0 < toAdd.length) {
                var board = new Board(listOfData.length, toAdd);
                $('.board-list').append(buildBoard(board));
                //$('.board-list').last().on('mouseenter')
                $('#title-input').val('');
                storage.state.saveData(board);
            }
        });

        // effects for boards
        $('.board-element').mouseenter(function() {
        $(this).children( '.board-show' ).hide(0, function(){
            $(this).next().fadeIn(50);
        });
        });
        $('.board-element').mouseleave(function() {
            $(this).children( '.board-edit' ).hide(0, function(){
                $(this).prev().fadeIn(50);
            })
        });

        // effects for new board
        $('#new-board-tile').mouseenter(function() {
        $(this).children( '#show' ).hide();
        $(this).children( '#edit' ).show();
        $( '#title-input' ).hide();
        $( '#title-input' ).fadeIn(100).focus();
        });
        $('#new-board-tile').mouseleave(function() {
            $( '#edit' ).hide(0, function(){
                $( '#show' ).show(0);
            });
        });
    });
}


// for Implementation1
var fromStorage = new State(new LocalStorageManager('list_of_boards'));
main(fromStorage);
// for Implementation2
// fromStorage.changeState(Sprint2Stuff());
// main(fromStorage);


