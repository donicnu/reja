console.log("Web Serverni boshlash");
const express = require("express"); //express ham function, ham object, (express external package, va bu framework ham)
const app = express(); //expres orqali app instance(ozgaruvchi) ovoldik
const http = require("http");
const fs =require("fs");

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
    console.log(req.body);
    res.json({ test: "success" });
})

app.get("/author", (req, res) => {
    res.render("author", { user: user });
})

app.get("/", function(req, res) {
    res.render("harid"); //render bn send farqi, send da css larni ham ola olamiz 
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(`This server is running successfully on port:${PORT}`);
});


//branch lar bilan ishlayotganda, usually develop branch da ishlab, keyin main branch ga merge qilinadi