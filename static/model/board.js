//
// Looks
//

// **** Board Object Constructor ****
function Board (id, title) {
    this.id = id;
    this.title = title;
    this.color = colorSelect(this);
    this.listOfCards = [];
}