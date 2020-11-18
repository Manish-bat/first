var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    cookieParser = require("cookie-parser"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash"),
    Vehicle  = require("./models/vehicle"),
    Detail     = require("./models/detail"),
    User        = require("./models/user"),
    session = require("express-session"),
    seedDB      = require("./seeds"),
    methodOverride = require("method-override");
	
var middleware = require("./middleware");
    


//requiring routes
var detailRoutes    = require("./routes/details"),
    vehicleRoutes = require("./routes/vehicles"),
    indexRoutes      = require("./routes/index")


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(cookieParser('secret'));

console.log(process.env.DATABASEURL);
 
//var url = process.env.DATABASEURL || "mongodb+srv://batman:123@travel-6gjpc.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect("mongodb+srv://batman:123@travel-6gjpc.mongodb.net/test?retryWrites=true&w=majority",
				 {
useUnifiedTopology: true,
	useCreateIndex: true,
useNewUrlParser: true});
// seedDB();
 // Vehicle.remove({}, function(err){
 //        if(err){
 //            console.log(err);
 //        } else {
 //        console.log("removed Vehicles!");
 // }
 // });
// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Hello Batman",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
	
});


app.get("/details/:id", function(req, res){
    //find the campground with provided ID
    Detail.findById(req.params.id, function(err, foundDetail){
        if(err){
            console.log(err);
        } else {
            console.log(foundDetail)
            //render show template with that campground
            res.render("details/show", {detail: foundDetail});
        }
    });
});






app.use("/", indexRoutes);
app.use("/vehicles", vehicleRoutes);
app.use("/vehicles/:id/details", detailRoutes);




// app.listen(process.env.PORT, process.env.IP, function(){
//    console.log("The YelpCamp Server Has Started!");
// });

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Server Has Started...")
})