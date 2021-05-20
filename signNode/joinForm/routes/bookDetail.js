var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('bookDetail', {title: '책 상세 조회'});
});

router.post('/', function(req, res, next) {
  console.log('req.body: ' + JSON.stringify(req.body));
  res.json(req.body);
});

module.exports = router;