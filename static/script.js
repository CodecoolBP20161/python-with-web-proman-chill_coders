$(document).ready(function() {
    $('button').click(function() {
        var toAdd = $("input[name=board]").val();
        $('div').append("<p>" + toAdd + "</p>");
    $('p').hover(
        function(){
            $(this).addClass('active')
        },
        function(){
            $(this).removeClass('active');
        });
    });
});
