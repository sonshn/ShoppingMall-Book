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
var path = require('path');

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

/*router.get('/', function(req,res){
  res.sendFile(path.join(__dirname, '/customerJoin'))
})*/

/*POST 회원가입*/
router.post('/join/customer', function(req,res,next){
  var datas = {
    "cust_id" : req.body.id,
    "cust_pwd" : req.body.passwd,
    "cust_name" : req.body.name,
    "cust_email" : req.body.email,
    /*"zipcode" : req.body.zipcode,

    "address" : req.body.address,*/ 
    "cust_phone_num" : req.body.tel,
    /*"cust_secession" : req.body.cust_secession,
    "cust_point" : req.body.cust_point,*/
    "birthday" : req.body.birth,
  
    "gender" : req.body.gender
}

console.log(datas.cust_id);
  
pool.getConnection(function(err,connection){
      connection.query('INSERT INTO customer SET ?', datas,function(err,rows){
          if(err) console.error("err : "+err);
          console.log("rows : " + JSON.stringify(rows));

          res.redirect('/join/customer');
          connection.release();
      });
  });
});
module.exports = router;
