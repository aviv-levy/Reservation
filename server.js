const express = require('express');
const app = express();

let mysql = require('mysql');


let connection = mysql.createConnection({
    host:'locahost',
    user:'root',
    password:'',
    database:'Queues'
})

app.get('/times',(req,res)=>{
console.log('hii');
// let query = 'SELECT user_login FROM wp_users';
// connection.query(query,(err,result)=>{
//     if(err) console.log(err);
//     res.send(result);
// })
})

app.listen(3000,()=>{
    console.log("Server is listening...");
})




//SQL queries

// //CREATE TABLE times (
//     id int PRIMARY KEY AUTO_INCREMENT,
//     datee DATE NOT NULL,
//     timee TIMESTAMP NOT NULL
// )