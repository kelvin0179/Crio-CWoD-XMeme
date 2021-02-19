const express = require('express');
const router = express.Router();
const Meme = require('../models/meme');

//returns last 100 memes
router.get('/memes', function (req, res, next) {
    Meme.find({}).limit(100).sort({ _id: -1 })
        .then(data => {
            if (data.length === 0) {
                res.status(500).send(data);
            }
            else {
                res.status(200).send(data);
            }
        });
})
//returns a Single meme
router.get('/memes/:id', function (req, res, next) {
    Meme.findOne({ _id: req.params.id })
        .then(data => res.send(data))
        .catch(() => res.status(404).send("Not Found"));
})

//To post a meme
router.post('/memes', function (req, res, next) {
    Meme.exists({ name: req.body.name, caption: req.body.caption, url: req.body.url })
        .then(data => {
            if (data === false) {
                Meme.create(req.body)
                    .then(data => {
                        res.status(201).json({
                            id: data.id
                        })
                    })
                    .catch(() => {
                        res.status(400).send("Bad Request");
                    })
            }
            else {
                res.status(409).send("Conflict");
            }
        })
        .catch(() => {
            res.status(400).send("Bad Request");
        })
})

//To Update a Meme
router.patch('/memes/:id', function (req, res, next) {
    Meme.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => Meme.findOne({ _id: req.params.id }))
        .then(data => {
            if (req.body.name !== undefined) {
                res.status(400).send("Bad Request");
            }
            else {
                res.status(200).json({
                    caption: data.caption,
                    url: data.url
                })
            }
        })
        .catch(() => {
            res.status(404).send("Not Found");
        });
})

//To Delete a meme
router.delete('/memes/:id', function (req, res, next) {
    Meme.findByIdAndRemove({ _id: req.params.id })
        .then(data => res.send(data))
        .catch(() => {
            res.status(404).send("Not Found");
        });
})

//for FrontEnd**************************************************************

//posts the meme and returns the last 100 memes
router.post('/meme', function (req, res, next) {
    Meme.create(req.body)
        .then(() => Meme.find({}).limit(100).sort({ _id: -1 }))
        .then(data => res.send(data))
        .catch((err) => {
            if (err.code === 11000) {
                res.status(409).send("Duplicate Found");
            }
            else {
                res.status(400).send("Bad Request");
            }
        });
})

//updates a meme and returns the last 100 memes
router.patch('/meme/:id', function (req, res, next) {
    Meme.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then(() => Meme.find({}).limit(100).sort({ _id: -1 }))
        .then(data => res.send(data))
        .catch(() => {
            res.status(404).send("Not Found");
        });
})

//deletes a meme and returns the last 100 memes
router.delete('/meme/:id', function (req, res, next) {
    Meme.findByIdAndRemove({ _id: req.params.id })
        .then(() => Meme.find({}).limit(100).sort({ _id: -1 }))
        .then(data => res.send(data))
        .catch(() => {
            res.status(404).send("Not Found");
        });
})

module.exports = router;