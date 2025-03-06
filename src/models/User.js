const mongoose=require('mongoose');

const userShema= new mongoose.Schema({
  email: {
    type:String,
    required: true,
    unique: true
  },

    username: {
      type:String,
      required: true,
      unique: true
    },

    password:{
       type:String,
       required: true
    }
    
})

module.exports= mongoose.model("User", userShema)