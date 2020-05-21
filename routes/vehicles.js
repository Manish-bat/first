var express = require("express");
var router  = express.Router();
var Vehicle = require("../models/vehicle");
var middleware = require("../middleware");


router.get("/",  middleware.isLoggedIn, function(req, res){
    // Get all vehicles from DB
    Vehicle.find({}, function(err, allVehicles){
       if(err){
           console.log(err);
       } else {
          res.render("vehicles/index",{vehicles:allVehicles});
       }
    });
});
 
//CREATE - add new vehicle to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to vehicles array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
	 var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newVehicle = {name: name, image: image, description: desc, author:author}
    // Create a new campground and save to DB
    Vehicle.create(newVehicle, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to vehicles page
            res.redirect("/vehicles");
        }
    });
});

//NEW - show form to create new vehicle
router.get("/new",middleware.isLoggedIn, function(req, res){
   res.render("vehicles/new"); 
});

// SHOW - shows more info about one vehicle
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Vehicle.findById(req.params.id).populate("details").exec(function(err, foundVehicle){
        if(err){
            console.log(err);
        } else {
            console.log(foundVehicle)
            //render show template with that Vehicle
            res.render("vehicles/show", {vehicle: foundVehicle});
        }
    });
});

// EDIT vehicle ROUTE
router.get("/:id/edit", middleware.checkVehicleOwnership, function(req, res){
    Vehicle.findById(req.params.id, function(err, foundVehicle){
        res.render("vehicles/edit", {vehicle: foundVehicle});
    });
});

// UPDATE vehicle ROUTE
router.put("/:id",middleware.checkVehicleOwnership, function(req, res){
    // find and update the correct vehicle
    Vehicle.findByIdAndUpdate(req.params.id, req.body.vehicle, function(err, updatedVehicle){
       if(err){
           res.redirect("/vehicles");
       } else {
           //redirect somewhere(show page)
           res.redirect("/vehicles/" + req.params.id);
       }
    });
});

// DESTROY Vehicle ROUTE
router.delete("/:id",middleware.checkVehicleOwnership, function(req, res){
   Vehicle.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/vehicles");
      } else {
          res.redirect("/vehicles");
      }
   });
});


module.exports = router;
