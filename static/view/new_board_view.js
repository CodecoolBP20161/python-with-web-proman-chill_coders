// **** New Board / Card maker object ****
function NewBoard (placeholder) {
    this.changed = false;
    this.placeholder = placeholder;
    this.show = '<h1 class="tile-text" id="title-default">New</h1><i class="fa fa-4x fa-plus-square"></i>';
    this.edit = '<input id="title-input" type="text" name="title-input" class="form-control input-lg"'+
    ' placeholder="' + this.placeholder + '" maxlength="9">' +
    '<i id="make-new" class="fa fa-4x fa-plus-square"></i>';
};


// super ugly global variable
var newBoard = new NewBoard('New');