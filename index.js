const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;

// create connection to database
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'socka'
});
// connect to database
db.connect((err)=>{
    if(err){
        console.log(err,"error in connecting to data base")
    }else{
        console.log("connection to db is successfull !!!");
    }
});
global.db = db;

// configure the middleware

app.set('port',process.env.port || port);
app.set('views',__dirname+'/views');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(fileUpload());

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

app.listen(port,()=>{console.log("server running on",port)})