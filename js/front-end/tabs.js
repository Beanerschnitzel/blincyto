$(document).ready(function() {
    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('is-active');
        $('.tabs-content').removeClass('is-active');
        $(this).addClass('is-active');
        $("#" + tab_id).addClass('is-active');
    })
})
