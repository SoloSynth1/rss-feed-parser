let Parser = require('rss-parser');
let parser = new Parser();

let parse = (async (feedUrl) => {

    let feed = await parser.parseURL(feedUrl);
    console.log(feed.title);

    feed.items.forEach(item => {
        console.log(item.title + ':' + item.link)
    });

})();

module.exports = parse;