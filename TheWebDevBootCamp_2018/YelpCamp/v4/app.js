var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    seedDB      = require("./seeds");

//seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
            res.render("campgrounds/index", {campgrounds: allCampground});
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
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided Id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });

    //render show template with that campground
});


// =====================================================================================
// COMMENTS ROUTES
// =====================================================================================

app.get("/campgrounds/:id/comments/new", function(req,res){
    console.log("in new comment page now "+ req.params.id);
    // find campground by id
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req,res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            console.log(req.body.comment);
            // Comment.create(req.body.comment, function(err, comment){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         foundCampground.comments.push(comment);
            //         foundCampground.save();
            //         res.redirect("/campgrounds/" + foundCampground._id);
            //     }
            // });
        }
    });
    // create new Comment
    // connect new commment to Campground
    // redirect campground
});




app.listen("3000", function(){
    console.log("======== YelpCamp Server Has Started =========")
});

//this is special for testing Sat 12.21am mmmm
