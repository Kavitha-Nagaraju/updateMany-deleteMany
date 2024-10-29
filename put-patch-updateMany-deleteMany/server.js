const express = require("express");
const cors = require("cors");
const mongoose  = require("mongoose");
const multer = require("multer");


let app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  },
});

const upload = multer({ storage: storage });

let userSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String,

});
let User = new mongoose.model("user",userSchema,"UsersData");

app.post("/signup",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file)
     try {
        let newUser = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password,
            mobileNo:req.body.mobileNo,
            profilePic:req.file.path,

        });

        await User.insertMany([newUser]);
        res.json({msg:"user data created successfully"})
     } catch (error) {
        console.log(error);
     }
});

app.post("/login",upload.none(),async(req,res)=>{
   console.log(req.body);
 let result = await User.find().and({ email: req.body.email });
 
   try {
   if(result.length>0){
   if(result[0].password==req.body.password){
    let dataToSend={
      firstName:result[0].firstName,
      lastName:result[0].lastName,
      age :result[0].age,
      email:result[0].email,
      mobileNo:result[0].mobileNo,
      profilePic:result[0].profilePic,
    };
    res.json({status:"success",data:dataToSend});
   }
   else{
    res.json({status:"failure",msg:"Invalid Password"});
   }
}else{
  res.json({status:"failure",msg:"Invalid Email"});
}
   } catch (error) {
    console.log(error)
    
   }
});

app.put("/updateDetails",upload.single("profilePic"),async(req,res)=>{
    console.log(req.body);
    console.log(req.file);
   try {
    if(req.body.firstName.trim().length>0){
        await User.updateMany({email:req.body.email},{firstName:req.body.firstName});
    }

    if(req.body.lastName.trim().length>0){
        await User.updateMany({email:req.body.email},{lastName:req.body.lastName});
    }

    if(req.body.age>0&&req.body.age<100){
        await User.updateMany({email:req.body.email},{age:req.body.age});
    
    }

    if(req.body.password.trim().length>0){
    await User.updateMany({email:req.body.email},{password:req.body.password})
    }

    if(req.body.mobileNo.length>0){
     await User.updateMany({email:req.body.email},{mobileNo:req.body.mobileNo});
    }

    if(req.file&&req.file.path){
    await User.updateMany({email:req.body.email},{profilePic:req.file.path})
    }

    res.json({status:"success",msg:"User data updated successfully"});

   } catch (error) {
    res.json({status:"Failure",msg:"unable to update user data"});
    console.log(error);
   }
});

app.delete("/deleteAccount",upload.none(),async(req,res)=>{
   let result = await User.deleteMany({email:req.query.email});
   console.log(result);
   try {
    if(result.deletedCount>0){
        res.json({status:"success",msg:"user data deleted successfully"})
    }
    
   } catch (error) {
    res.json({status:"failure",msg:"Unable to delete user data"});
   }
})

app.listen(3456,()=>{
   console.log("Listen to the port 3456")
});

let connectToMDB=async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017/put-update-delete");
    console.log("conneceted to mdb successfully");
  } catch (error) {
    console.log("unable to connect MDB");
    console.log(error);
  }
};
connectToMDB();