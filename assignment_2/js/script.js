const feed_url = {
    popular: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Frss.xml%3Fedition%3Dus&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=25',
    world: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=25',
    business: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fbusiness%2Frss.xml&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=25',
    technology: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Ftechnology%2Frss.xml&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=25',
    science: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fscience_and_environment%2Frss.xml&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=25',
    entertainment: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fentertainment_and_arts%2Frss.xml&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=25'
};

// make AJAX calls to 'category_urls' and cache to memory in object
// params: 'category_urls' - object containing k,v pair of JSON endpoints
// return: Object of k,v pairs in the format category:[feed_item]
function loadFeeds(category_urls) {
    // object to hold feeds
    let feed = {};

    // get & store each feed in memory for fast loading
    $.each(category_urls, (category, url) => {
        feed[category] = [];

        // get feed at 'url'
        $.getJSON( url, (data) => {
            // iterate over items within feed, add to local cache
            $.each(data.items, (idx, feed_item) => {
                feed[category].push(feed_item);
            }); buildFeed(feed[category], '#'+category);
        });
    });
}

// adds cards to '#feed-panel' from Array 'category-feed'
// params: 'category_feed': [feed_item]
//         'target': selector to append to
function buildFeed(category_feed, target) {
    
    // iterate over set of articles and build cards
    $.each(category_feed, (idx, item) => {
        // image element
        let item_img = $('<div></div>')
        .addClass('card-image-overflow')
        .append( 
            $('<img />')
                .attr('src', item.thumbnail)
                .attr('height', '150px')
        );
        
        // content element
        let item_summary = $('<div></div>')
            .addClass('card-content')
            .append( $('<p></p>').text(item.content) );

        // header element
        let item_title = $('<div></div>')
            .addClass('card-title')
            .append( 
                $('<p></p>')
                    .text(item.title)
        );
        
        // action link element
        let item_link = $('<div></div>')
            .addClass('card-action')
            .addClass('waves-effect')
            .append( 
                $('<a></a>')
                    .attr('href', item.link)
                    .text('Read more')
        );

        // content container
        let item_content = $('<div></div>')
            .addClass('card-stacked')
            .append( item_title )
            .append( item_summary )
            .append( item_link );
        
        // card container
        let new_item = $('<article></article>')
            .addClass('card')
            .addClass('horizontal')
            .append(item_img)
            .append(item_content);
        
        // add card element to feed
        new_item.appendTo(target);
    });
}

// simple routing function for handling URLs
function route(target) {
    $('main').hide();
    
    if ( $(target).length > 0 ) {
        $(target).show();
    } else if (target == '') {
        route('#popular');
    } else {
        route('#404');
    }
}

function showSpinner() {
    console.log('loading...');
}

function hideSpinner() {
    console.log('loaded!');
}

$(document).ready( () => {

    showSpinner();
    loadFeeds(feed_url);
    hideSpinner();
    
    route('#popular');

    // router listener
    $(window).on('hashchange', () => {
        new_loc = window.location.hash;
        route(new_loc);
    });

    $('.button-collapse').sideNav();

});