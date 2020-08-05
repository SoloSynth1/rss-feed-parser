const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();

module.exports.parsePubsub = (jsonString) => {
    return JSON.parse(jsonString);
};

module.exports.publish = (publishableItems, spaceList) => {
    publishableItems.forEach(item => {
        let title = item.title;
        let link = item.link

        spaceList.forEach(spaceObj => {
            let message = {
                title: title,
                link: link,
                space: spaceObj.space,
                name: spaceObj.feedName,
            };
            let data = JSON.stringify(message);
            publishMessage(data);
        });
    });
};

async function publishMessage(data) {
    const topicName = 'rss-feed-messages';

    const dataBuffer = Buffer.from(data);

    const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
    console.log(`Message ${messageId} published.`);
}

publishMessage().catch(console.error);