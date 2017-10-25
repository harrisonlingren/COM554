// form functions will go here
var menuExpanded = true;

function changeMenu() {
    if (menuExpanded) {
        // if menu is expanded, collapse
        $('nav').animate({
            'width': '0px'
        },
        {
            'duration': 200
        });
        $('.menu-link').hide();
        $('footer').hide();
        menuExpanded = false;

    } else {
        // if menu is collapsed, expand
        $('nav').animate({
            'width': '250px'
        },
        {
            'duration': 200
        });
        $('footer').show();
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

    // switch between tabs
    $('.tab-header').click((tab) => {
        tab = $(tab.currentTarget);
        // switch active tab if not already active
        if ( !tab.hasClass('active') ) {
            $('.tab-header').removeClass('active');
            tab.addClass('active');

            // show correct tab content
            let tabContentId = parseInt(tab.attr('id').substr(-1));
            $('.tab-content').hide();
            $('.tab-content').eq(tabContentId).show();
        }
    });

    // switch between nav menu options
    $('.menu-link').click((link) => {
        link = $(link.currentTarget);
        if ( !link.hasClass('active') ) {
            $('.menu-link').removeClass('active');
            link.addClass('active');
        }
        $('.menu-btn').click();
    });

    // set initial state
    $('#menu-link-home').click();
    $('#tab-header-0').click();
});