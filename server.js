const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    gender:String,
    emailId:String,
    password:String,
    number:Number,
    profilePics:String,
});

let user = new mongoose.model("student",userSchema,"batch7878");

let app = express();
app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));

app.listen(7777,()=>{
    console.log("listening to port 7777");
});

const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, "images")
  },
  filename: (req, file, cb)=> {
    cb(null, `${Date.now()}_${file.originalname}`  )
  }
})
const upload = multer({ storage: storage })

app.post("/signup",upload.single("profilePics"),async(req,res)=>{
   console.log(req.body);
   console.log(req.file)
   let userArr = await user.find();
   console.log(userArr);
   res.json(userArr);
  try {
    let student = new user({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    age:req.body.age,
    gender:req.body.gender,
    emailId:req.body.emailId,
    password:req.body.password,
    number:req.body.number,
    profilePics:req.file.path,
    })
    await user.insertMany([student]);
    res.json({status:"success",msg:"data inserted into mangodb"});
    } catch (error) {
   console.log( {status:"failure",msg:"data is not inserted into mangodb"});
    }
    
});
  
app.get("*",()=>{
  res.sendFile("./client/build/index.html");
})

let  connectedToMGDB = async ()=>{
    try {
         await mongoose.connect("mongodb+srv://Nithin_75:nithin_75@batch250203.bljaajo.mongodb.net/king?retryWrites=true&w=majority&appName=Batch250203");
         console.log("successfully connected to mangodb");
    } catch (error) {
        console.log("unable to connect to mangodb");
    }
}
connectedToMGDB()