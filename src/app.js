const express = require('express');
const router = express.Router();
const Subscriber = require('./models/subscribers');

// GET /subscribers
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.send(subscribers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET /subscribers/names
router.get('/subscribers/names', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}, { name: 1, subscribedChannel: 1 });
    res.send(subscribers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// GET /subscribers/:id
router.get('/subscribers/:id', getSubscriber, (req, res) => {
  res.send(res.subscriber);
});

async function getSubscriber(req, res, next) {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(400).send({ message: 'Cannot find subscriber' });
    }
    res.subscriber = subscriber;
    next();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

module.exports = router;
