const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql");
const pino = require('express-pino-logger')();
const client = require('twilio')(
    process.env.REACT_APP_TWILIO_ACCOUNT_SID,
    process.env.REACT_APP_TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(pino);

const valuesBdd = {
    host: "localhost",
    user: process.env.BDD_USER,
    password: process.env.BDD_PASSWORD,
    database: process.env.BDD_NAME,
    socketPath: process.env.BDD_PATH,
    port: '8888',
}
let db = mysql.createConnection(
    valuesBdd
);

/*app.get('/api/testgetter', async (req, res) => {
    new Promise((resolve, reject) => {
        db.query("SELECT * FROM users WHERE id = 1 ", function (err, result) {
            if (err) reject(err);
            console.log('The solution is: ', result[0]);
            resolve(result[0]);
        });
    }).then(response => {
        console.log("data", response);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({user: response}));
    })
        .catch(err => console.log(err))
});
*/

app.post('/api/usersbynumber', async (req, res) => {
    res.header('Content-Type', 'application/json');
    console.log(req.body.token, process.env.BDD_TOKEN)
    if(typeof req.body.token === "undefined"){
        res.send(JSON.stringify({status:401}));
        return}
    else if(req.body.token !== process.env.BDD_TOKEN){
        res.send(JSON.stringify({status:403}));
        return}
    const phoneNumber = req.body.phoneNumber;
    new Promise((resolve, reject) => {
        db.query("SELECT phone_number FROM users WHERE phone_number = ? ", [phoneNumber], function (err, result) {
            if (err) reject(err);
            console.log('The solution is: ', result);
            resolve(result);
        });
    }).then(response => {
        console.log("data", response);
        if(response.length >0){
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({userFound: true, status:200}));
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({userFound: false, status:404}));
        }
    })
        .catch(err =>
        {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({userFound: false, status:500}));
        })
});

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({greeting: `Hello ${name}!`}));
});

app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    if(typeof req.body.token === "undefined"){
        res.send(JSON.stringify({status:401}));
        return}
    else if(req.body.token !== process.env.BDD_TOKEN){
        res.send(JSON.stringify({status:403}));
        return}
    client.messages
        .create({
            from: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
            to: req.body.to,
            body: req.body.body
        })
        .then(() => {
            res.send(JSON.stringify({success: true}));
        })
        .catch(err => {
            console.log(err);
            res.send(JSON.stringify({success: false}));
        });
});


app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);
