const express = require('express');
const app = express()

const Subscriber = require('./models/subscribers');
const ObjectId = require("mongoose");


app.get('/subscribers', (req, res) => {
    Subscriber.find().then(subscribers => res.send(subscribers));
    return;
});
app.get('/subscribers/names', (req, res) => {
    Subscriber.find().select({name: 1, subscribedChannel: 1}).then(subscribers => res.send(subscribers));
    return;
});
app.get('/subscribers/:id', (req, res) => {
    const id = req.params.id;
    Subscriber.find({_id : id}).then(subscribers => subscribers.map(subscribers => res.send(subscribers))).catch(error => res.status(400).send({message: error.message}));
    return;
});















module.exports = app;
