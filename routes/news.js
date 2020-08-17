const express = require('express');
const News = require('../models/news')
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    let search = req.query.search || ''; // lub '' żeby trim() nie blokowała jeśli wyszukiwanie jest puste 
    search = search.trim()

    const findNews = News
        .find({ title: new RegExp(search, 'i') })
        .sort({ date: -1 }); // wewnątrz właściwość, po której sortujemy, metoda mongoosowa

    findNews.exec((err, data) => {
        const nonConfirmed = data.filter((el) => !el.confirmed)
        res.render('news/news', { title: 'News', data, nonConfirmed });
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id

    const oneNews = News.findById(id);

    oneNews.exec((err, data) => {
        res.render('news/one-news', { data });
    });
})

module.exports = router;