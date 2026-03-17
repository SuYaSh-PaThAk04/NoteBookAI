import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
     refreshToken: {
      type: String,
      default: null,
    },
    password: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

userSchema.methods.generateAccessToken=function(){
   try {
     return jwt.sign({
         _id:this._id,
         username:this.username,
         email:this.email,
     },
   process.env.JWT_SECRET,
   {expiresIn:"1h"}
 );
   } catch (error) {
    console.log("Error in geenrating the aceess token : ",error.message);
    return null;
   }
};

const User=mongoose.model("User",userSchema);
export default User;