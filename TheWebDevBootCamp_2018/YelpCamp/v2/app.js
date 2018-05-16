var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:String,
    image:String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill", 
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcYAE8PQYP1TJM4h3Zn9R65DSVmnoGFqDogH31tLeecouCxwb2w",
//         description: "This is a huge granite hill, no bathroom, no water. Beautiful grnaite!!!"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else{
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(campground);
//         }
//     }); 

app.get("/", function(req,res){
    res.render("landing");
});

//INDEX - show all campgrounds
app.get("/campgrounds", function(req,res){
    // Get all campground from DB
    Campground.find({}, function(err, allCampground){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampground});
        }
    });
});

//CREATE - add new campground to DB
app.post("/campgrounds", function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};

    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided Id
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show",{campground:foundCampground});
        }
    });

    //render show template with that campground
});

app.listen("3000", function(){
    console.log("======== YelpCamp Server Has Started =========")
});

//this is special for testing Sat 12.21am mmmm
