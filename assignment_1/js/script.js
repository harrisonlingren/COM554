// form functions will go here
// get available residences for contact form from JSON
var availableResidences = {};
$.getJSON('js/residences.json', (data) => {
    availableResidences = data.residences;
    console.log(availableResidences);
});

// flag for sidenav state
var menuExpanded = true;
function changeMenu() {
    if (menuExpanded) {
        // if menu is expanded, collapse
        $('nav').animate(
            { 'width': '0px' },
            { 'duration': 200 }
        );

        $('.menu-link').hide();
        $('footer').hide();
        menuExpanded = false;

    } else {
        // if menu is collapsed, expand
        $('nav').animate(
            { 'width': '250px' },
            { 'duration': 200 }
        );

        $('footer').show();
        $('.menu-link').show();
        menuExpanded = true;
    }
}

// change residences by selected year
function yearSelection(year) {
    let y = parseInt(year);
    let options = [];
    $.each(availableResidences, (i, residence) => {
        if (residence.years.includes(y)) {
            options.push(residence.name);
        }
    }); return options;
}

// accordion handler function
function accordionHandler(e) {
    let elem = e.target;

    let accPanel = $(elem).next();
    if ( accPanel.css('display') == 'none' ) {
        accPanel.show();
    } else {
        accPanel.hide();
    }
}

// tooltip handler functions
function tooltipOpen(target, message) {
    if ( $(target+'tip').length == 0 ) {
        $(target).after('<div class="tooltip" id="' + target + 'tip">' + message + '</div>'); 
    } $(target+'tip').fadeIn(200).css('display', 'inline-block');
}

function tooltipClose(target) {
    $(target+'tip').fadeOut(200);
}

// auto-populate the hall feature lists from JSON
function getHallFeatures() {
    let selector = '';
    $.each(availableResidences, (i, hall) => {
        // populate only if features are present
        if (hall.features) {
            // select the 'hall' features list
            selector = '#tab-content-'+ i + ' .accordion-content:eq(0) ul';
            $.each(hall.features.hall, (j, feature) => {
                let newLi = '<li>' + feature + '</li>';
                $(newLi).appendTo(selector);
            });

            // select the 'room' features list
            selector = '#tab-content-'+ i + ' .accordion-content:eq(1) ul';
            $.each(hall.features.room, (j, feature) => {
                let newLi = '<li>' + feature + '</li>';
                $(newLi).appendTo(selector);
            });
        }
    });
}


$(document).ready(() => {
    // show home on initial load
    $('.menu-section').hide();
    $('.thanks').hide();
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

    $('.title > h2, .title > h3').click(() => { $('#menu-link-home').click() });

    // menu expand/collapse
    $('.menu-btn').click(changeMenu);

    // switch between nav menu options
    $('.menu-link').click((link) => {
        link = $(link.currentTarget);
        if ( !link.hasClass('active') ) {
            $('.menu-link').removeClass('active');
            link.addClass('active');
        } $('.menu-btn').click();
    });

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

    // populate hall feature lists
    getHallFeatures();

    // accordion logic
    $('.accordion-header').click(accordionHandler);

    // tooltips logic
    $('#first').mouseenter(() => { tooltipOpen('#first', 'Your forename'); });
    $('#first').mouseleave(() => { tooltipClose('#first') });

    $('#last').mouseenter(() => { tooltipOpen('#last', 'Your surname'); });
    $('#last').mouseleave(() => { tooltipClose('#last'); });

    $('#year').mouseenter(() => { tooltipOpen('#year', 'Your academic year'); });
    $('#year').mouseleave(() => { tooltipClose('#year'); });

    // change residence select options when selected year changes
    $('#year').change(() => {
        let y = $('#year').val();
        let options = yearSelection(y);

        // clear options and update
        $('#residence').html('<option disabled selected>Choose a hall...</option>');
        $.each(options, (i, o) => { $('<option value="' + o + '">' + o +'</option>').appendTo( $('#residence') ); });
        $('.residence').show();
    });

    // show message textarea when hall is chosen
    $('#residence').change(() => {
        $('.message').show();
    });

    // check values before submitting contact form
    $('#send').click(() => {
        // check if fields have values before submitting
        if ( $('#first').val() == '' || $('#last').val() == '' || $('#year').val() == '' || $('#residence').val() == '' || $('#message').val() == '' ) {
            tooltipOpen('#send', 'Please fill out all fields before submitting!');
        
        // "submit" form
        } else {
            $('#section-contact .form').hide();
            $('.thanks').show();
        }
    });

    // set initial state
    $('#menu-link-options').click();
    $('#tab-header-0').click();
});