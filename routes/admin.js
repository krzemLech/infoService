const express = require('express');
const router = express.Router();
const News = require('../models/news')

const maxArticles = process.env.MAX_ARTICLES || 15;

router.all('*', (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login')
        return
    }
    next()
});

router.get('/', (req, res) => {
    const data = News.find({}, (err, data) => {
        res.render('admin/index', { title: 'Admin', data });
    })
});

router.get('/news/add', (req, res) => {

    if (req.session.vote >= 2) {
        res.render('admin/sorry', { title: 'Sorry', subtitle: 'you have already added a news today' });
        return
    }
    res.render('admin/news-form', { title: 'Add your news', errors: {}, body: {} });
})

router.post('/news/add', (req, res) => {
    // processing data from the form
    const body = req.body;
    let content = body.content.includes('/') ? body.content.split('/') : [body.content];
    content = content.map(paragraph => paragraph.trim());

    News.find({}, (err, data) => {
        if (err) return console.log(err)
        // check on number of articles in the db
        else if (data.length > maxArticles) {
            const fullDb = { errors: ['To many articles in the database. Please remove some older articles so you could add new ones.'] }
            res.render('admin/news-form', { title: 'Add your news', errors: fullDb, body });
            return
        } else {
            // adding articles to the database
            const newsData = new News({
                title: body.title,
                lead: body.lead || null,
                content,
            })

            //form validation
            const errors = newsData.validateSync();

            newsData.save((err) => {
                if (err) {
                    console.log(err);
                    res.render('admin/news-form', { title: 'Add your news', errors, body });
                    return
                }
                req.session.vote = 2
                res.redirect('/admin')
            });
        };
    });
});

router.get('/news/delete/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id, (err) => {
        console.log(err);
        res.redirect('/admin')
    })
})

module.exports = router;