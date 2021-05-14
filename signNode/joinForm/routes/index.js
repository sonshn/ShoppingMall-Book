var express = require('express');
var router = express.Router();
//MySQL loading
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 5,
  host : 'localhost',
  user: 'root',
  password: '1234',
  database: 'sw_project_table'
});

/* GET home page. */
router.get('/', function(req,res,next) {
  pool.getConnection(function(err,connection){
    connection.query('SELECT * FROM customer',function(err,rows){
      //'SELECT * FROM board' -> 'SELECT * FROM customer' : 성공
      if(err) console.error("err : "+err);
      console.log("rows : " + JSON.stringify(rows));

      res.render('index', { title: 'test',rows: rows});
      connection.release();
    });
  });
});

module.exports = router;
