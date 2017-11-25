// RSS data sources
const feed_url = {
    popular: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Ftopstories&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    world: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fworld&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    business: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fbusiness&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    technology: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.feedburner.com%2Ftimeblogs%2Fnerd_world&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    science: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fscienceandhealth&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10',
    entertainment: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds2.feedburner.com%2Ftime%2Fentertainment&api_key=thiymnmlz04ef6qv64guvrusttzljtba4o4oqhya&order_by=pubDate&order_dir=desc&count=10'
};

// object to hold feeds
const feed = {};
const all_feeds_guids = {};

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
            }); 
            addToAggregateFeed(feed[category]);
            buildFeed(feed[category], '#'+category);
        });
    });
}

function addToAggregateFeed(aggregate_feed) {
    $.each(aggregate_feed, (idx, article) => {
        let guid = article.guid.substr( article.guid.indexOf('p=')+2 );
        if ( !all_feeds_guids[guid] ) {
            all_feeds_guids[guid] = article;
        }
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
        let item_guid = item.guid.substr( item.guid.indexOf('p=') + 2 );
        let item_content_link = '#article?id=' + item_guid;

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

// show loading spinner
function showSpinner() {
    $('.feed-panel').hide();
    $('.article-panel').hide();
    $('#spinner').show();
}

// hide loading spinner
function hideSpinner() {
    $('#spinner').hide();
}

// Load content for 'article_guid' and display
// params: 'article_guid': ID of the article to be displayed
//         'article_category': category of the article for searching
function showArticle(article_guid) {
    showSpinner();
    
    // find article object using 'article_guid'
    let article = all_feeds_guids[article_guid];

    // load article content to DOM
    $('.article-panel .article-title').text(article.title)
    $('.article-panel .article-author').text(article.author);
    $('.article-panel .article-body').html(article.content);
    $('.article-panel .article-media img').attr('src', article.thumbnail);
    $('.article-panel .article-permalink').attr('href', 'https://time.com/?p='+article_guid);

    let d = new Date(article.pubDate);
    let pub_date = d.toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }); $('.article-panel .article-date').text(pub_date);

    hideSpinner();
    $('.article-panel').show();
}

// most recently viewed page
let recent_history = [];

// simple routing function for handling URLs
// params: 'target': URL hash string of resource
function route(target) {
    $('main').hide();

    if (target.includes('search')) {
        let query = target.substr( target.indexOf('q=') + 2 );
        search(query);

    } else if (target.includes('article?id=')) {
        let item_guid = target.substr( target.indexOf('id=') + 3 );
        showArticle(item_guid);
        
    } else if ( $(target).length > 0) {
        $(target).show();

    } else if (target == '') {
        route('#popular');
    } else {
        route('#404');
    }

    $(window).scrollTop(0);
    recent_history.push(target);
    return;
}

// simple article keyword search in content+title
// params: 'keyword': the term for the search
function search(keyword) {
    showSpinner();

    // search
    keyword = keyword + ' ';
    let results = [];
    $.each(all_feeds_guids, (guid, article) => {
        let content = (article.content).toLowerCase();
        let title = (article.title).toLowerCase();
        keyword = keyword.toLowerCase();

        if (content.includes(keyword) || title.includes(keyword) ) {
            results.push(article);
        }
    });

    // build search results
    $('#search-results').empty();
    $('#search-results').append('<h3>Search results for ' + keyword + ':</h3>');
    $('#search-results').append('<a class="cancel-search">&larr; Return to feed</a>');
    buildFeed(results, '#search-results');

    hideSpinner();
    $('#search-results').show();
}

// validate search input and route
function checkSearch() {
    let query = $('#search').val();
    if (query !== '') {
        query = query.toLowerCase();
        route('#search?q=' + query);
    }
}

// go back in time...
function back() {
    let secondToLast = recent_history[ recent_history.length - 2 ];
    route(secondToLast);
}

$(document).ready(() => {

    showSpinner();
    loadFeeds(feed_url);    
    route('');
    hideSpinner();

    // router listener
    $(window).on('hashchange', () => {
        new_loc = window.location.hash;
        route(new_loc);
    });

    $('.button-collapse').sideNav();

    $('#search').keypress((e) => {
        if (e.keyCode == 13) { checkSearch(); }        
    });

    $('.cancel-search').click( () => { back() } );
    $('#404-back').click(() => { back(); });

});