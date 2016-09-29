// **** Card Object Constructor ****
function Card (id, owner, title) {
    this.id = id;
    this.owner = owner;
    this.title = title;
}

// **** Draw new card and save to db ****
var drawNewCard = function(storage) {
    $('#make-card').click(function () {
        var current = JSON.parse(localStorage.getItem('current_board'));
        var toAdd = $('#title-input').val();
        if (0 < toAdd.length) {
            var card = new Card(current.listOfCards.length, current, toAdd);
            $('#title-input').val('');
            storage.state.saveData(current, card);
        }
    });
};