var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var campgrounds = [
    {name: "Salmon Creek", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIXbOZ0_UpNJOSoP0Gzoq6jwLP3IjihbnPstGcHDeJfBeerH0"},
    {name: "Granite Hill", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcYAE8PQYP1TJM4h3Zn9R65DSVmnoGFqDogH31tLeecouCxwb2w"},
    {name: "Da Lat", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwFwqq8Sp8afDcu8nlJmH1xxbvH8I6ZvdpIGADLiAUIfFzJgWr8w"},
    {name: "Salmon Creek", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOIXbOZ0_UpNJOSoP0Gzoq6jwLP3IjihbnPstGcHDeJfBeerH0"},
    {name: "Granite Hill", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcYAE8PQYP1TJM4h3Zn9R65DSVmnoGFqDogH31tLeecouCxwb2w"},
    {name: "Da Lat", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwFwqq8Sp8afDcu8nlJmH1xxbvH8I6ZvdpIGADLiAUIfFzJgWr8w"}

];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image:image};
    campgrounds.push(newCampground);

    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.listen("3000", function(){
    console.log("======== YelpCamp Server Has Started =========")
});

//this is special for testing Sat 12.21am
