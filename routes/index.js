var express = require('express');
var router = express.Router();
var mysql = require("mysql");


var db_name = 'michal';
var table_name = 'users';
var db_data =
[
    {
        name: "James",
        lastName: "Bond",
        age: 45
    },
    {
        name: "Tomas",
        lastName: "Simcisko",
        age: 22
    },
    {
        name: "Gustav",
        lastName: "Hlavac",
        age: 29
    }
];
//MYSQL Connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root'
});

connection.connect(function(err, conn) {
    if(err) {
        console.log('MySQL connection error: ', err);
        process.exit(1);
    }
    else
    {
        connection.query('CREATE DATABASE IF NOT EXISTS '+db_name); // Vytvorime databazu ak este neexistuje
        connection.query('USE '+db_name); // Specifikujeme, ktoru chceme DB pouzit
        connection.query('CREATE TABLE IF NOT EXISTS '+table_name+' (' +
        'id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,' +
        'name VARCHAR(30) NOT NULL,' +
        'lastName VARCHAR(30) NOT NULL,' +
        'age INT(3))');

       // insert(table_name);
    }

});

function insert(table_name)
{
    for (var i in db_data) // Vlozime vsetky data do DB
    {
        connection.query('INSERT INTO '+table_name +'(name,lastName,age) VALUES("'+db_data[i].name+'","'+db_data[i].lastName+'",' +
        ''+db_data[i].age+');');
    }

}

function select(table_name,res)
{
    connection.query('SELECT * from users',function(err,result)
    {
       res.render('index',{data: result});
    });
}
/* GET home page. */
router.get('/', function(req, res, next) {
  select(table_name,res)
});

module.exports = router;
