
var mongoose    = require("mongoose"),
    bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONGIG
var blogSchema = new mongoose.Schema({
        title: String,
        image: String,
        body: String,
        created: {type: Date, default: Date.now}  
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Test blog",
//     image: "",
//     body:"HELLO THIS IS A BLOG POST FROM TIM"
// });


// RESTFUL ROUTES

app.get("/", function(req,res){
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", function(req,res){
    // res.render("index");
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index",{blogs:blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req,res){
   // res.render("in New page now");
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req,res){
    // create blog
    Blog.create(req.body.blog ,function(err, newBlog){
        if(err) {
            console.log(err);
        } else {
    // then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req,res){
    res.render("edit");
});

app.listen("3000", function(){
    console.log("====== BLOG SERVER HAS STARTED!!!! =====");
});