//express bu server quradigan framework
console.log("Web Serverni boshlash");
const express = require("express"); //express ham function, ham object, (express external package, va bu framework ham)
const app = express(); //expres orqali app instance(ozgaruvchi) ovoldik
const fs =require("fs");


// MongoDB 
const db = require("./server").db();
const mongodb = require("mongodb");
// const db = require("./server").db();

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
    if(err) {
        console.log("ERROR:", err);
    } else {
        user = JSON.parse(data) //json parse bn object ga otkazyapti
    }
});
//BSSR: 
//express web serverni qurish shartli 4 stepsga bo'linadi
//1: KIRISH code:
app.use(express.static("public")); //browser dan kirib kelayotgan ma'lumotlar uchun public folder ochiq deyish
app.use(express.json()); //json formatni object holatiga change qilib beradi, va serverga json format yozishimizga ham togri kelyapti
app.use(express.urlencoded({ extended: true })); //html form dan post qilinganda express qabul qilib oladi

//2: Session code:

//3:Views code:
//ejs orqali view yasaydigan folder yasaymiz, html bn frontend yasaymiz backend ichida
app.set("views", "views");
app.set("view engine", "ejs")

//4 Routing code:
app.post("/create-item", (req, res) => {
    console.log("user entered /create-item")
    const new_reja = req.body.reja;
    db.collection("plans").insertOne({reja: new_reja}, (err, data) => {
        console.log(data.ops);
        res.json(data.ops[0]);
    });
})

app.get("/author", (req, res) => {
    res.render("author", { user: user });
});

app.post("/delete-item", (req, res) => {
    const id = req.body.id;
    db.collection("plans").deleteOne(
        {_id: new mongodb.ObjectId(id)}, 
        function(err, data) {
        res.json({state: "success"});
    })
    //object id ichiga, mongodb id type ni ham soragani uchun wrap qilib yozish kk
});


app.get("/", function(req, res) {
    console.log('user entered /')
    db.collection("plans")
    .find()
    .toArray((err, data) => {
        if(err) {
            console.log(err);
            res.end("something went wrong");
        } else {
            console.log(data);
            res.render("reja", {items: data}); //render bn send farqi, send da css larni ham ola olamiz 
        }
    });
});

module.exports = app
