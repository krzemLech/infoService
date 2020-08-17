const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz')

/* GET home page. */
router.get('/', (req, res) => {
    const show = !req.session.vote;


    Quiz.find({}, (err, data) => {
        let sum = 0;
        data.forEach(item => sum = sum + item.vote)

        res.render('quiz', { title: 'News poll', data, show, sum });
    })
    // new Quiz({ title: 'Pytanie 1', vote: 0 }).save()
});

router.post('/', (req, res) => {
    const id = req.body.quiz; // właściwość zgodna z nazwą radio
    Quiz.findOne({ _id: id }, (err, data) => {
        data.vote++
        data.save((err) => {
            req.session.vote = 1;

            res.redirect('/quiz');
        })
    })
})

module.exports = router;