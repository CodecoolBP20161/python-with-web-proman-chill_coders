// ProMan Web application
// By Chill_coders (Ádám, Andris, Dóri, Levi, Misi)
// According to State Pattern design


// **** State Object Constructor****
function State (state) {
    this.state = state;

    this.changeState = function(state) {
        this.state = state
    };

    this.loadData = function() {
        this.state.loadData()
    };

    this.saveData = function() {
        this.state.saveData()
    };
}


// **** Board Object Constructor ****
function Board (title) {
    this.id = localStorage.length + 1;
    this.title = title;
    this.save_data = function (data, keyword) {
        localStorage.setItem(keyword + '_' + data["id"], JSON.stringify(data));
    };
}


// **** Implementation1 --- with browser's localStorage ****
function LocalStorageManager() {

}


// **** MAIN ****
function main() {
    $(document).ready(function () {
        // localStorage.clear();

        for (var i = 1; i < localStorage.length + 1; i++) {
            var board = JSON.parse(localStorage.getItem('board' + '_' + i));
            $('div').append('<p>' + board.title + '</p>').fadeIn('fast');
        }

        $('#add').click(function () {
            var toAdd = $("input[name=board]").val();
            $('div').append("<p>" + toAdd + "</p>");
            var board = new Board(toAdd);
            board.save_data(board, 'board');
        });
    });
}


// **** calling for functions ****
main();

// for Implementation1
// x = new State(LocalStorageManager());
// main(x);
// for Implementation2
// x.changeState(Sprint2Stuff());
// main(X);




