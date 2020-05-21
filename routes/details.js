var express = require("express");
var router  = express.Router({mergeParams: true});
var Vehicle = require("../models/vehicle");
var Detail = require("../models/detail");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn, function(req, res){
    // find campground by id
    Vehicle.findById(req.params.id, function(err, vehicle){
        if(err){
            console.log(err);
        } else {
             res.render("details/new", {vehicle: vehicle});
        }
    })
});

router.post("/", middleware.isLoggedIn,function(req, res){
   //lookup vehicle using ID
   Vehicle.findById(req.params.id, function(err, vehicle){
       if(err){
           console.log(err);
           res.redirect("/vehicles");
       } else {
        Detail.create(req.body.detail, function(err, detail){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               //add username and id to comment
               detail.author.id = req.user._id;
               detail.author.username = req.user.username;
               //save comment
               detail.save();
               vehicle.details.push(detail);
               vehicle.save();
               console.log(detail);
               req.flash("success", "Successfully added detail");
               res.redirect('/vehicles/' + vehicle._id);
           }
        });
       }
   });
});

   //create new comment
   //connect new comment to campground
   //redirect campground show page




// DETAIL EDIT ROUTE
router.get("/:detail_id/edit", middleware.checkDetailOwnership, function(req, res){
   Detail.findById(req.params.detail_id, function(err, foundDetail){
      if(err){
          res.redirect("back");
      } else {
        res.render("details/edit", {vehicle_id: req.params.id, detail: foundDetail});
      }
   });
});

// detail UPDATE
router.put("/:detail_id", middleware.checkDetailOwnership, function(req, res){
   Detail.findByIdAndUpdate(req.params.detail_id, req.body.detail, function(err, updatedDetail){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/vehicles/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:detail_id", middleware.checkDetailOwnership, function(req, res){
    //findByIdAndRemove
    Detail.findByIdAndRemove(req.params.detail_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Detail deleted");
           res.redirect("/vehicles/" + req.params.id);
       }
    });
});

module.exports = router;