const express = require("express");
const app = express();
const path = require("path");
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session'); 
const flash = require('connect-flash');
const ejsMate = require("ejs-mate");

const sessionOptions = {
    secret: process.env.SECRET  ,
    resave: false,
    saveUninitialized: true
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended:true}));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use(sessionOptions());
app.use(flash());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", (req, res) => {
    res.render("../views/listings/show.ejs");
});

app.get("/skills", (req, res) => {
    res.render("../views/listings/skills.ejs");
});

app.get("/contact", (req,res) => {
    res.render("../views/listings/contact.ejs");
});

app.get("/resume", (req, res) => {
    res.render("../views/listings/resume.ejs");
});

app.get("/certificates", (req, res) => {
    res.render("../views/listings/certificates.ejs");
});

app.get("/achievements", (req, res) =>{
    res.redirect("/");
});

app.get("/flash", (req, res) => {
    console.log(req.flash("success"));
    res.render("show.ejs", { msg: req.flash("success") });
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err; 
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log(`app is listening on port 8080`);
});