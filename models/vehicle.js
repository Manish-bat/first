var mongoose = require("mongoose");

var vehicleSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
	created:  {type: Date, default: Date.now},
	
	 author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
	
	
   details: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Detail"
      }
   ],
	
});

module.exports = mongoose.model("Vehicle", vehicleSchema);