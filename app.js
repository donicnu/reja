//express bu server quradigan framework
console.log("Web Serverni boshlash");
const express = require("express"); //express ham function, ham object, (express external package, va bu framework ham)
const app = express(); //expres orqali app instance(ozgaruvchi) ovoldik
const fs = require("fs");

//DATABASE//cluster/database/collection/document/dataset
//callback methodlarda 3-argument function buladi, 1 va 2 err va data tashlaydi
//http ni createserver methodi orqali app ni pass qilyabmiz

// MongoDB
const db = require("./server").db(); //mongo dbdan kelyotgan file ni module.exports ni oqivolyapmiz
const mongodb = require("mongodb");

let user;
fs.readFile("database/user.json", "utf8", (err, data) => {
  if (err) {
    console.log("ERROR:", err);
  } else {
    user = JSON.parse(data); //json parse bn object ga otkazyapti
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
app.set("views", "views"); //backend ichida frontend yasash uchun ejs ishlatyabmiz
app.set("view engine", "ejs"); //korish engine bu ejs, view engine sifatida ejs olgin

//4 Routing code:
app.post("/create-item", (req, res) => {
  console.log("user entered /create-item");
  const new_reja = req.body.reja;
  db.collection("plans").insertOne({ reja: new_reja }, (err, data) => {
    console.log(data.ops);
    res.json(data.ops[0]);
  });
});

app.get("/author", (req, res) => {
  res.render("author", { user: user });
});

app.post("/delete-item", (req, res) => {
  const id = req.body.id;
  db.collection("plans").deleteOne(
    { _id: new mongodb.ObjectId(id) },
    function (err, data) {
      res.json({ state: "success" });
    }
  );
  //object id ichiga, mongodb id type ni ham soragani uchun wrap qilib yozish kk
});

app.post("/edit-item", (req, res) => {
  const data = req.body;
  console.log(data);
  db.collection("plans").findOneAndUpdate(
    { _id: new mongodb.ObjectId(data.id) },
    { $set: { reja: data.new_input } },
    function (err, data) {
      res.json({ state: "success" });
    }
  );
});
app.post("/delete-all", (req, res) => {
  if (req.body.delete_all) {
    db.collection("plans").deleteMany(function () {
      res.json({ state: "hamma rejalar ochirildi" });
    });
  }
});
app.get("/", function (req, res) {
  console.log("user entered /");
  db.collection("plans")
    .find()
    .toArray((err, data) => {
      if (err) {
        console.log(err);
        res.end("something went wrong");
      } else {
        console.log(data);
        res.render("reja.ejs", { items: data }); //render bn send farqi, send da css larni ham ola olamiz
      }
    });
});
//get orqali faqat read(oqiymiz) qilamiz, post bilan esa update, delete va etc qilsak boladi
module.exports = app;
