let Rss = require('rss-parser');
let parser = new Rss();

module.exports.parse = async (obj) => {

    const feedUrl = obj.feed;
    const onlyFetchAfter = obj.onlyFetchAfter;

    let getFeed = async (feedUrl) => {
        try {
            return await parser.parseURL(feedUrl);
        } catch (e) {
            console.log(`error occurred during fetching: ${e}`)
            return [];
        }
    }

    let feed = getFeed(feedUrl);

    let publishableItems = [];

    feed.items.forEach(item => {
        let pubTime = new Date(item.isoDate).valueOf() / 1000;  // converting milliseconds to seconds for comparison
        if (pubTime > onlyFetchAfter) {
            publishableItems.push(item);
        }
    });
    return publishableItems;
};
