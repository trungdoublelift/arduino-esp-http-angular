const express = require("express");
const app = express();
const body = require("body-parser");
const cors = require('cors');
const config = require('./config')
app.use(body.json());
app.use(cors());

const admin = require('firebase-admin');
const serviceAccount = require('./key.json');
const { query } = require("express");
function init() {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("database is connected!");
    } catch (err) {
        console.log("connect to server failed!");
    }
    try {
        app.listen(config.PORT, config.HOST, () => {
            console.log(`server is running on ${config.HOST}:${config.PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}
init();

app.get("/", async (req, res) => {
    res.send("true");


})
app.get("/t", async (req, res) => {
    let {temp} = req.query;
    console.log(req.query);
    let flag = "false";
    const data = (await admin.firestore().collection('main').doc('limit').get()).data();
    const alarm = (await admin.firestore().collection('main').doc('alarm').get()).data();
    
    await admin.firestore().collection("main").doc("temp").update({
        temp: temp,
        date: Date.now()
    });
    if(data.limit <= parseFloat(temp)||alarm.alarm){
        flag = "true";
    }
    res.send(flag);
})