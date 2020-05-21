var mongoose = require("mongoose");

var detailSchema = mongoose.Schema({
    text: String,
   place: String,
	account: String,
	km: String,
	driver:String,
	overall:String,
	rokadi: String,
	output3: String,
	output6: String,
	output9: String,
	totalmall: String,
	diesel: String,
	tmallroyalty: String,
	field1:String,
	rasta: String,
	zila: String,
	noentry: String,
	air: String,
	kaata: String,
	commission: String,
	created:  {type: Date, default: Date.now},
	 author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
    },
});

module.exports = mongoose.model("Detail", detailSchema);