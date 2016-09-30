// **** Card Object Constructor ****
function Card (id, owner, title) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.color = colorSelect(this);
}

// **** Build html node from card object ****
var buildCard = function(card_object) {
    var card_html = '<div class="card-element" id="' +
                     card_object.id + '">' +
                     '<div class="card-show">' +
                     '<div class="thumbnail tile tile-medium ' + card_object.color + '">' +
                     '<h1 class="tile-text"> ' + card_object.title + ' </h1>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
    return card_html
};


// **** Draw new card and save to db ****
var drawNewCard = function(event) {
    var current = JSON.parse(localStorage.getItem('current_board'));
    var toAdd = $('#title-input').val();
    $('#title-input').val('');
    if (0 < toAdd.length) {
        var card = new Card(current.listOfCards.length, current.id, toAdd);
        storage.state.saveData(current, card);
        $('.card-list').append(buildCard(card));
    }
};


// **** Draw existing cards when in card view mode ****
var drawCards = function() {
    var page_state = localStorage.getItem('page_state');
    if (page_state === 'card-level') {
        var current = JSON.parse(localStorage.getItem('current_board'));
        if (current !== null) {
            var card_list = current.listOfCards;
            for (var i = 0; i < card_list.length; i++) {
                $('.card-list').append(buildCard(card_list[i]));
            }
        }

    }

};

// **** removes all cards ****
function removeCards() {
    $('.card-element').remove();
}