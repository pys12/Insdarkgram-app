const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const instaSchema = new Schema({
    username: {
        type: String,
        required:true
    },
  
    profilePhoto: {
        type: String,
    },
    img: {
        type: String,
        required:true
    },
    caption:{
        type: String
    },
    tag: {
      type: Array
    },
    time: {
        type: Date,
        default: new Date()
    }
},{timestamps:true})


const Insta = mongoose.model('Insta', instaSchema);

module.exports = Insta;





