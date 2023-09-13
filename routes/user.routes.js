const express=require("express")
const {UserModel}=require("../model/user.model")

const userRouter=express.Router()


//posting into the database ==> C
userRouter.post("/add",async(req,res)=>{
    const payload=req.body
    const user=new UserModel(payload)
    await user.save()
    res.send("Data has been added to the database")
})

//read the data from database ==> R
userRouter.get("/",async(req,res)=>{
    const query=req.query
    console.log(query)
    const users=await UserModel.find(query)
    res.send(users)
})

//update the data ==> U
userRouter.patch("/update/:userID",async(req,res)=>{
    const {userID}=req.params
    const payload=req.body
    await UserModel.findByIdAndUpdate({_id:userID},payload)
    res.send(`Document with ID:${userID} has been updated`)
})

//Delete the data ==> D
userRouter.delete("/delete/:userID",async(req,res)=>{
    const {userID}=req.params
    await UserModel.findByIdAndDelete({_id:userID})
    res.send(`Document with ID:${userID} has been deleted`)
})

module.exports={
    userRouter
}