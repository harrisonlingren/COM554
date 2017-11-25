const feed_url = {
    popular: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Ftopstories&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    //world: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fworld&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    //business: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fbusiness&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    //technology: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.feedburner.com%2Ftimeblogs%2Fnerd_world&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    //science: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fscienceandhealth&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    // entertainment: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fentertainment&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10'
};

// object to hold feeds
const feed = {};

// make AJAX calls to 'category_urls' and cache to memory in object
// params: 'category_urls' - object containing k,v pair of JSON endpoints
// return: Object of k,v pairs in the format category:[feed_item]
function loadFeeds(category_urls) {
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
    // console.log(category_feed);
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
        let item_desc = item.description;
        item_desc = item_desc.substr(0, item_desc.indexOf('<img') ) + '...';

        let item_summary = $('<div></div>')
            .addClass('card-content')
            .append( $('<p></p>').text(item_desc) );

        // header element
        let item_title = $('<div></div>')
            .addClass('card-title')
            .append( 
                $('<p></p>')
                    .text(item.title)
        );
        
        // action link element
        let item_guid = item.guid.substr(19);
        let item_content_link = target + '?item=' + item_guid;

        let item_link = $('<div></div>')
            .addClass('card-action')
            .addClass('waves-effect')
            .append( 
                $('<a></a>')
                    .attr('href', item_content_link)
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
    console.log(target);

    if (target.includes('?item')) {
        let item_guid = target.substr(14);
        let item_category = target.substr(1, target.indexOf('?') - 1);
        showArticle(item_category, item_guid);
        
    } else if ( $(target).length > 0) {
        $(target).show();

    } else if (target == '') {
        route('#popular');
    } else {
        route('#404');
    }
}

// Load content for 'article_guid' and display
// params: 'article_guid': ID of the article to be displayed
//         'article_category': category of the article for searching
function showArticle(article_category, article_guid) {
    showSpinner();
    console.log('Showing article:', article_guid, article_category);
    let article_obj = {}

    $.each(feed[article_category], (idx, article) => {
        console.log(article.guid, article_guid);
        if (article.guid.substr(19) == article_guid) {
            article_obj = article;
            return;
        }
    });

    $('.article-panel .article-title').text(article_obj.title)
    $('.article-panel .article-author').text(article_obj.author);
    $('.article-panel .article-date').text(article_obj.pubDate);
    $('.article-panel .article-body').html(article_obj.content);

    hideSpinner();
    $('.article-panel').show();
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
    route('#popular');
    hideSpinner();

    // router listener
    $(window).on('hashchange', () => {
        new_loc = window.location.hash;
        route(new_loc);
    });

    $('.button-collapse').sideNav();

});