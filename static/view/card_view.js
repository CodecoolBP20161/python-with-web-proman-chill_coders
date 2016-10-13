// **** Build html node from card object ****
var CardView = function(cardObject) {
    var cardHtml = '<div class="card-element" id="' +
                     cardObject.id + '">' +
                     '<div class="card-show">' +
                     '<div class="thumbnail tile tile-medium ' + cardObject.color + '">' +
                     '<h1 class="tile-text"> ' + cardObject.title + ' </h1>' +
                     '</div>' +
                     '</div>' +
                     '</div>';
    return cardHtml
};


// **** Draw new card and save to db ****
var drawNewCard = function(event) {
    event.preventDefault();
    var current = JSON.parse(localStorage.getItem('currentBoard'));
    var toAdd = $('#title-input').val();
    $('#title-input').val('');
    if (0 < toAdd.length) {
        var card = new Card(current.listOfCards.length, current.id, toAdd);
        console.log(card);
        storage.state.saveData(current, card);
        $('.card-list').append(CardView(card)).hide();
        $( '.card-list' ).last().on("click", function (event) {
            //cardEvents(event);
        });
        $( '.card-list' ).last().fadeIn(300);
    }
};


// **** Draw existing cards for the current board ****
var drawCards = function() {
    var pageState = localStorage.getItem('pageState');
    if (pageState === 'card-level') {
        var current = JSON.parse(localStorage.getItem('currentBoard'));
        if (current !== null) {
            var cardList = current.listOfCards;
            for (var i = 0; i < cardList.length; i++) {
                $('.card-list').append(CardView(cardList[i]));
            }
        }

    }

};


// **** Removes all cards ****
function removeCards() {
    $('.card-element').remove();
}