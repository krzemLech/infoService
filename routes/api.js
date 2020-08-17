const express = require('express');
const News = require('../models/news')
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    let search = req.query.search || ''; // lub '' żeby trim() nie blokowała jeśli wyszukiwanie jest puste 
    search = search.trim()

    let sort = req.query.sort || -1;
    if (sort !== -1 || sort !== 1) {
        sort = -1
    }


    const findNews = News
        .find({ title: new RegExp(search, 'i') })
        .sort({ date: sort }) // wewnątrz właściwość, po której sortujemy, metoda mongoosowa
        .select('_id title description'); // metoda mongoosowa, pozwala ograniczyć pola (właściwości) wysyłane przez api

    findNews.exec((err, data) => {
        res.json(data);
    })

});

router.get('/:id', (req, res) => {
    const id = req.params.id;


    const findNews = News
        .findById(id)
        .select('_id title description')

    findNews.exec((err, data) => {
        if (err) console.log(err);
        res.json(data);
    })

});

module.exports = router;