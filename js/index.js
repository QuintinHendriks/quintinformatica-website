var amount = '';

function scroll() {
    $('#sites').animate({
        scrollLeft: amount
    }, 100, 'linear',function() {
        if (amount != '') {
            scroll();
        }
    });
}
$('#scroll-right').hover(function() {
    amount = '+=80';
    scroll();
}, function() {
    amount = '';
});
$('#scroll-left').hover(function() {
    amount = '-=80';
    scroll();
}, function() {
    amount = '';
});