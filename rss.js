let Rss = require('rss-parser');
let parser = new Rss();

module.exports.parse = async (obj) => {

    const feedUrl = obj.feed;
    const onlyFetchAfter = obj.onlyFetchAfter;

    let feed = await parser.parseURL(feedUrl);

    let publishableItems = [];

    feed.items.forEach(item => {
        let pubTime = new Date(item.isoDate).valueOf() / 1000;  // converting milliseconds to seconds for comparison
        if (pubTime > onlyFetchAfter) {
            publishableItems.push(item);
        }
    });
    return publishableItems;
};
