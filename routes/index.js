const express = require('express');
const router = express.Router();
const login = process.env.ADMIN_NAME || 'admin'
const password = process.env.ADMIN_PASS || '123'

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'infoService' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', error: false });
});

router.post('/login', (req, res) => {
  const body = req.body
  if (body.login === login && body.password === password) {
    req.session.admin = 1;
    res.redirect('/admin')
  } else {
    res.render('login', { title: 'Login', error: 'Incorrect login or password' });
    // res.redirect('/login')
  }
});

module.exports = router;
