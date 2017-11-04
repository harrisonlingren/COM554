// object to hold residence hall data
var availableResidences = {};

// flag for sidenav state
var menuExpanded = true;

// sidenav menu controls
function menuToggle() {
    if (menuExpanded) { menuCollapse() }
    else { menuExpand() }
}

function menuExpand() {
    // if menu is collapsed, expand
    console.info('expanding');
    $('nav').animate(
        { 'width': '250px' },
        { 'duration': 200 }
    );

    $('footer').show();
    $('.menu-link').show();
    menuExpanded = true;
}

function menuCollapse() {
    // if menu is expanded, collapse
    console.info('collapsing');
    $('nav').animate(
        { 'width': '0px' },
        { 'duration': 200 }
    );

    $('.menu-link').hide();
    $('footer').hide();
    menuExpanded = false;
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
    if ( $(target+'tip').length <= 0 ) {
        $(target).after('<div class="tooltip" id="' + target.substr(1) + 'tip">' + message + '</div>'); 
    } $(target+'tip').fadeIn(200).css('display', 'inline-block');
}

function tooltipClose(target) {
    $(target+'tip').fadeOut(200);
}

// click handler for dropdown
function dropdownClick(e) {
    let elem = $(e.target);
    let parent = elem.parent();
    let items = elem.siblings().not('.dropdown-selected');
    
    if ( parent.hasClass('active') ) {
        parent.removeClass('active');
        $.each(items, (i,v) => { $(v).hide() });
    } else {
        parent.addClass('active');
        parent.children().filter('.dropdown-selected').text( 'Choose one...' );
        $.each(items, (i,v) => { $(v).show() });
    }
}

// click handler for dropdown item
function dropdownItemClick(e) {
    let parent = $(e.target).parent();
    let items = $(parent).children().not('.dropdown-selected');
    let selectedText = $(e.target).text();
    let selectedVal = $(e.target).attr('value');

    parent.children().filter('.dropdown-selected').text( selectedText );
    parent.attr('value', selectedVal );
    parent.removeClass('active');
    $.each(items, (i,v) => { $(v).hide() });
}

// change residence select options when selected year changes
function changeSelectedYear() {
    let y = $('#year').attr('value');
    let options = yearSelection(y);

    // clear options and update
    $('#residence').html('');
    $.each(options, (i, o) => { $('<div class="dropdown-item" value="' + o + '">' + o +'</div>').appendTo( $('#residence') ); });
    
    if ( $('.residence .dropdown-selected').length == 0 ) {
        $('.residence').children(':first-child').before('<span class="dropdown-selected">Choose one...</span>');
    }
    
    $('.residence .dropdown-selected').click( dropdownClick );
    $('.residence .dropdown-item').click( dropdownItemClick );
    $('#residence').children().not('.dropdown-selected').click(changeSelectedResidence);
    $('.residence').show().css('display', 'inline-block');
}

// show message textarea when hall is chosen
function changeSelectedResidence() { $('.message').show(); }

// auto-populate the hall feature lists from JSON
function getHallFeatures(data) {
    let selector = '';
    $.each(data, (i, hall) => {
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

// auto-populate the residence hall table from JSON
function getHallTable(data) {
    $('table#halls').append('<tr id="0"><th></th></tr>');
    $.each(data, (i, hall) => {
        let newCell = '<th>' + hall.name + '</th>';
        $(newCell).appendTo( 'tr#0' );
    });

    let years = ['First', 'Second', 'Third', 'Fourth']; let newElem = '';
    $.each(years, (i, year) => {
        newElem = '<tr id="' + (i+1) + '"><td>' + year + '</td></tr>';
        $(newElem).appendTo( 'table#halls' );

        $.each(data, (j, hall) => {
            if ( hall.years.includes(i+1) ) {
                newElem = '<td> X </td>';
            } else {
                newElem = '<td></td>';
            } //console.log(newElem);
            $(newElem).appendTo( 'tr#' + (i+1) )
        });
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
    $('.menu-btn').click(menuToggle);

    // switch between nav menu options
    $('.menu-link').click((link) => {
        link = $(link.currentTarget);
        if ( !link.hasClass('active') ) {
            $('.menu-link').removeClass('active');
            link.addClass('active');
        } $('.menu-btn').click();
    });

    // get available residences for contact form from JSON
    $.getJSON('js/residences.json', (data) => {
        availableResidences = data.residences;
        // populate hall feature lists and homepage table
        getHallFeatures(availableResidences);
        getHallTable(availableResidences);
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

    // accordion logic
    $('.accordion-header').click(accordionHandler);

    // tooltips logic
    $('#first').mouseenter(() => { tooltipOpen('#first', 'Your forename'); });
    $('#first').mouseleave(() => { tooltipClose('#first') });

    $('#last').mouseenter(() => { tooltipOpen('#last', 'Your surname'); });
    $('#last').mouseleave(() => { tooltipClose('#last'); });

    // initialize dropdown elements
    $('.dropdown').children(':first-child').before('<span class="dropdown-selected">Choose one...</span>');
    $('.dropdown-selected').click( dropdownClick );
    $('.dropdown-item').click( dropdownItemClick );

    // for handling generic click events
    $(window).click((e) => {
        // close active dropdown if user clicks outside
        if ( !$(e.target).hasClass('dropdown') && !$('.dropdown').find(e.target).length) {
            let dropdown = $('.dropdown.active');
            dropdown.children().filter('.dropdown-selected').text( 'Choose one...' );
            let items = dropdown.children().not('.dropdown-selected');
            $.each(items, (i,v) => { $(v).hide() });
            dropdown.removeClass('active');
        }

        // close sidenav menu if user clicks outside
        if ( !$(e.target).is('nav') && !$(e.target).is('.menu-btn, .menu-btn > a, .menu-btn-bar') && menuExpanded == true ) { 
            menuCollapse();
        }
    });

    // click handler for year dropdown
    $('#year').children().not('.dropdown-selected').click(changeSelectedYear);

    // check values before submitting contact form
    $('#send').click(() => {
        // check if fields have values before submitting
        if ( $('#first').val() == '' || $('#last').val() == '' || $('#year').attr('value') == '' || $('#residence').attr('value') == '' || $('#message').val() == '' ) {
            tooltipOpen('#send', 'Please fill out all fields before submitting!');
        
        // "submit" form
        } else {
            $('#section-contact .form').hide();
            $('.thanks').show();
        }
    });

    // set initial state
    $('#menu-link-home').click();
    $('#tab-header-0').click();
});