const express=require("express")
const mongoose=require("mongoose")
const createError=require('http-errors')
const router=express.Router();

const Product=require('../Model/Product.model');
const ProductController=require('../Controllers/Product.controller')

//getting products
router.get('/',ProductController.getAllProducts)

//creating a new product
router.post('/',ProductController.createProduct)


//finding product by id
router.get('/:id',ProductController.findProductById)

//updating the product
router.patch('/:id',ProductController.updateProduct)


//deleting the product
router.delete('/:id',ProductController.deleteProduct)

module.exports=router;