const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    Image : {
        type : String,                //This Schema should be mentioned as a string
        required: true
    },
    users: Array,
    sender :{
        type:mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
},
    {
     timeStamps:true,
    }
)

module.exports = mongoose.model('Image', ImageSchema);