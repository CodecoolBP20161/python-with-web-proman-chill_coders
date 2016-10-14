// **** Card Object Constructor ****
function Card (id, owner, title) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.color = colorSelect(this);
}