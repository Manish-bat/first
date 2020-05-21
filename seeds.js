var mongoose = require("mongoose");
var Vehicle = require("./models/vehicle");
var Detail   = require("./models/detail");
//var detail    = require("./models/detail");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

// var data1 = [
// 	{
// 		overall:  "Rs.213",
// 		rokadi:  "Rs. 234",
// 		output9: "Rs. 53"
// 	}
// ]

function seedDB(){
   //Remove all campgrounds
   Vehicle.remove({}, function(err){
        if(err){
            console.log(err);
        } 
        console.log("removed Vehicles!");
         //add a few vehicles
        data.forEach(function(seed){
            Vehicle.create(seed, function(err, vehicle){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a vehicle");
                    //create a comment
                    Detail.create(
                        {  
                            text: "This place is great, but I wish there was internet",
                            author: "Homer",
							overall: "1323",
							rokadi: "234",
							output9: "432",
							output3: "345",
							output6: "564",
							totalmall: "453",
							diesel: "445",
							tmallroyalty: "562",
							field1:"123",
							rasta: "123",
							zila: "123",
							noentry: "123",
							air: "123",
							kaata: "123",
							commission: "123"
                        }, function(err, detail){
                            if(err){
                                console.log(err);
                            } else {
                                vehicle.details.push(detail);
                                vehicle.save();
                                console.log("Created new detail");
                            }
                        });
                }
            });
        });
    }); 

}


module.exports = seedDB;