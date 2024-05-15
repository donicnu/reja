console.log("Web Serverni boshlash");
const express = require("express");
const app = express();
const http = require("http");
//BSSR: 
//express web serverni qurish shartli 4 stepsga bo'linadi
//1: KIRISH code:
app.use(express.static("public")); //browser dan kirib kelayotgan ma'lumotlar uchun public folder ochiq deyish
app.use(express.json()); //json formatni object holatiga change qilib beradi
app.use(express.urlencoded({ extended: true })); //html form dan post qilinganda express qabul qilib oladi

//2: Session code:

//3:Views code:
//egs orqali view yasaydigan folder yasaymiz, html bn frontend yasaymiz backend ichida
app.set("views", "views");
app.set("view engine", "ejs")

//4 Routing code:
app.post("/create-item", (req, res) => {
    console.log(req.body);
    res.json({ test: "success" });
})

app.get("/", function(req, res) {
    res.render("harid");
});

const server = http.createServer(app);
let PORT = 3000;
server.listen(PORT, function () {
    console.log(`This server is running successfully on port:${PORT}`);
});


//branch lar bilan ishlayotganda, usually develop branch da ishlab, keyin main branch ga merge qilinadi