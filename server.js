const http = require("http");
const mongodb = require("mongodb")

let db;
const connectionString = "mongodb+srv://donicnu:9402898aaA@cluster0.hbnwx9r.mongodb.net/Reja"


mongodb.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
if(err) console.log("ERROR on connection MongoDB");
else {
    console.log("MongoDB connection successful");
    // console.log(client);
   module.exports = client;


    const app = require("./app")
    const server = http.createServer(app);
    let PORT = 3000;
    server.listen(PORT, function () {
        console.log(`This server is running successfully on port:${PORT}, http://localhost:${PORT}`);
    });
}
});


