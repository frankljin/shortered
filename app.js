const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const shorturl = require("./models/shortered")

mongoose.connect('mongodb://localhost:27017/shortered', {
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

app.listen("3000", function(){
    console.log("Server is up on port 3000.")
})