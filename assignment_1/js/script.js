// form functions will go here
var menuExpanded = false;

function changeMenu() {
    if (menuExpanded) {
        // if menu is expanded, collapse
        $('.menu-link').hide();
        $('nav').animate({
            'width': '0px'
        },
        {
            'duration': 200,
            'queue': false
        });

        $('.container').animate({
            'margin-left': '0px'
        },
        {
            'duration': 200,
            'queue': false
        });
        menuExpanded = false;

    } else {
        // if menu is collapsed, expand
        $('nav').animate({
            'width': '250px'
        },
        {
            'duration': 200,
            'queue': false
        });
        $('.container').animate({
            'margin-left': '250px'
        },
        {
            'duration': 200,
            'queue': false
        });
        $('.menu-link').show();
        menuExpanded = true;
    }
}

$(document).ready(() => {
    // show home on initial load
    $('.menu-section').hide();
    $('#section-home').show();

    // menu click events
    $('#menu-link-home').click(() => {
        $('.menu-section').hide();
        $('#section-home').show();
    });

    $('#menu-link-options').click(() => {
        $('.menu-section').hide();
        $('#section-options').show();
    });

    $('#menu-link-contact').click(() => {
        $('.menu-section').hide();
        $('#section-contact').show();
    });

    // menu expand/collapse
    $('.menu-btn').click(changeMenu);

});