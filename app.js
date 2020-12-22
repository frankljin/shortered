const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const shorturl = require("./models/shortered")

mongoose.connect('mongodb+srv://frank:mypass@cluster0.pilxx.mongodb.net/shortered?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

app.get("/", async function(req, res){
    const shorturls = await shorturl.find();
    res.render("index", {shorturls: shorturls});
})

app.post("/short", async function(req, res){
    await shorturl.create({full: req.body.wurl})
    res.redirect("/");
})

app.get("/:shorturl", async function(req, res){

    const clickurl = await shorturl.findOne({short: req.params.shorturl});
    res.redirect(clickurl.full);
})

let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}
app.listen(port, function(){
    console.log("Server is up.");
})