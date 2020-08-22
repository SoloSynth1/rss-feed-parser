const express = require('express');

const pubsub = require("./pubsub");
const rss = require("./rss");

const app = express();

app.use(express.json());

app.post('/', async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        const msg = 'no Pub/Sub message received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    if (!req.body.message) {
        const msg = 'invalid Pub/Sub message format';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }

    const pubSubMessage = req.body.message;

    const jsonString = pubSubMessage.data
        ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
        : '{}';

    const obj = pubsub.parsePubsub(jsonString);
    console.log("\ndecoded message data:");
    console.log(obj);

    const publishableItems = await rss.parse(obj);
    pubsub.publish(publishableItems, obj.spaces);

    res.status(204).send();
});

// module.exports = app;
app.listen(8080, '0.0.0.0');