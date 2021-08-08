const ItemSchema= require("../models/ItemSchema");
const config = require("../config/env");
const createError=require("http-errors")

exports.getItems = async (req, res, next) => {
  try{
    let items= await ItemSchema.find({})
     console.log("data is here");
    res.json({success:true,data:items})
  }catch(err){
    next(err)

  }   
 };
 exports.getSingelItem = async (req, res, next) => {
   try{
     const {id}=req.params;
     const item = await ItemSchema.findById(id)
     if(item){
       return res.json({success:true,data:item})
     }else{
       next(new createError.BadRequest("No such Item Found in the Collection"))
     }

   }catch(err){
     next(err)
   }
};


exports.postItem=async (req,res,next)=>{
  try{
    const item=new ItemSchema(req.body)
    await item.save()
    res.send({success:true,data:item})

  }catch(err){
    next(err)
  }
}
exports.patchItem=async (req,res,next)=>{
  try{
    const {id}=req.params;
    // Update item in db
    const item = await ItemSchema.findByIdAndUpdate(id,req.body,{new:true})
    res.send({success:true,data:item})
    
  }catch(err){
    next(err)
  }
}

exports.deleteItem=async (req,res,next)=>{
  try{
    const {id}=req.params;
    // Delete item from db
    const item = await ItemSchema.findByIdAndDelete(id)
    res.send({success:true,data:"Successfully Deleted"})
   
  }catch(err){
    next(err)
  }
}

