const mongoose=require("mongoose")
const express=require("express")
const createError=require('http-errors')
const Product=require('../Model/Product.model')


module.exports={
    getAllProducts: async(req,res)=>{
        try{
            const result=await Product.find()
            // const result=await Product.find({},{ __v:0})// this will remove this field from result
           // const result=await Product.find({},{name:1,_id:0})// this will remove id and will only show name
            //const result=await Product.find({price:1299},{}) // this will only print items having price 1299
    
            res.send(result)
        }
        catch(error){
            console.log(error.message)
        }
    },
    findProductById: async(req,res,next)=>{
        let id=req.params.id
        try {
            const product= await Product.findOne({ _id:id})
            if(!product){
                throw createError(400,"product doesnt exist...")
            }
            res.send(product)
            
        } catch (error) {
            // console.log(error.message)
            if (error instanceof mongoose.CastError)
            {
                next(createError(400,'invalid product id..'))
                return
            }
            next(error)
            
        }
    },
    createProduct :(req,res,next)=>{
        console.log(req.body)
        const product=new Product({
            name: req.body.name ,  price : req.body.price
        })
        product.save().then(result=>{
            console.log(result)
            res.send(result)
        }).catch(err=>{
            if(err.name === 'ValidationError')
            {
                next(createError(422,'error.message'))
                return
            }
            next(err);
        })
        res.send("product is created")
    },
    updateProduct:async(req,res)=>{
        try {
            let id=req.params.id;
            const updates=req.body
            const options={new:true}
            const result=await Product.findByIdAndUpdate(id,updates,options)
            if(!result){
                throw createError(400,"product doesnt exist...")
            }
            res.send(result)
        } catch (error) {
            if (error instanceof mongoose.CastError)
            {
                next(createError(400,'invalid product id..'))
                return
            }
            next(error)       
        }
    },
    deleteProduct:async(req,res,next)=>{
        let id=req.params.id;
        try {
            const result=await Product.findByIdAndDelete(id)
            if(!result){
                throw createError(400,"product doesnt exist...")
            }
            res.send(result)
        } catch (error) {
            // console.log(error.message)
            if (error instanceof mongoose.CastError)
            {
                next(createError(400,'invalid product id..'))
                return
            }
            next(error)
        }
    }
}