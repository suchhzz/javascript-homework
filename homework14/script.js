$(document).ready(function() {
    
    $('.tabs-title').click(function() {
        $('.tabs-title').removeClass('active');
        $('.tabs-content li').removeClass('active');

        let index = $(this).index();

        $(this).addClass('active');
        $('.tabs-content li').eq(index).addClass('active');
    });
});