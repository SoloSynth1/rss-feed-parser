let Rss = require('rss-parser');
let parser = new Rss();

module.exports.parse = async (obj) => {

    const feedUrl = obj.feed;
    const onlyFetchAfter = obj.onlyFetchAfter;
    const onlyFetchBefore = new Date().valueOf() / 1000;

    let feed = await getFeed(feedUrl);

    let publishableItems = [];

    if (feed && feed.hasOwnProperty('items') && Array.isArray(feed.items)) {
        feed.items.forEach(item => {
            let pubTime = new Date(item.isoDate).valueOf() / 1000;  // converting milliseconds to seconds for comparison
            if (pubTime > onlyFetchAfter && pubTime <= onlyFetchBefore) {
                publishableItems.push(item);
            }
        });
    }
    return publishableItems;
};

async function getFeed(feedUrl) {
    try {
        return await parser.parseURL(feedUrl);
    } catch (e) {
        console.log(`error occurred during fetching: ${e}`)
        return [];
    }
}

console.log();