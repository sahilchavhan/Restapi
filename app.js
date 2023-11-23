// console.log("hello world i am running");
// const http=require('http');
// const server= http.createServer((req,res)=>{
//     res.write("hello world my name is sahil");
//     res.end();
// });
// server.listen(3000,()=>{
//     console.log("server started");
// })




// const http=require("http");
// const server=http.createServer((req,res)=>{
//     if(req.url=="/")
//     {
//         if(req.method=="GET")
//         {
//             res.write("get method");
//         }
//         res.write("this is home page")
//         res.end();
//     }
//     else if(req.url=="/about")
//     {
//         res.write("this is about page")
//         res.end();
//     }
//     else{
//         res.write("hello world my name is sahil");
//         res.end();
//     }
// })

// server.listen((3000),()=>{
//     console.log("server started");
// })



// const express=require("express");
// const server= express();

// server.get('/',(req,res)=>{
//     console.log(req.url);
//     console.log(req.method);
//     res.send("I am the home page");
// })

// server.post('/',(req,res)=>{

// })

// server.delete('/',(req,res)=>{
    
// })

// server.listen(3000,()=>{
//     console.log("this is express")
// })


const express=require("express");

const mongoose=require("mongoose");

const createError=require("http-errors");

const bodyParser = require('body-parser');

const server=express();

server.use(bodyParser.json());



const product=require('./Route/Product.route.js')
server.use('/products',product)

server.all('/test',(req,res)=>{//tis is an example of query string
    console.log(`request method ${req.method} and url ${req.originalUrl}`);
    console.log(req.query)
    res.send(req.query)
})

server.all('/test/:id/:name',(req,res)=>{//tis is an example of route parameters
    console.log(`request method ${req.method} and url ${req.originalUrl}`);
    console.log(req.params)
    res.send(req.params)
})

server.all('/test',(req,res)=>{//tis is an example of request body
    console.log(`request method ${req.method} and url ${req.originalUrl}`);
    console.log(req.body)
    res.send(req.body)
   // res.send(req.body)//in request body we cant directly send req.body in res.send for that we have to import express.json() refer to line 67
})

mongoose.connect('mongodb+srv://sahilchavhan57:B9UltVxAaO3K99Yi@cluster0.caawaza.mongodb.net/',
{
    dbName: 'Restapi',
    useNewUrlParser : true,
    useUnifiedTopology :true
})
.then(()=>{
    console.log("mongodb connected.....")
})
//mongodb+srv://sahilchavhan57:<password>@cluster0.caawaza.mongodb.net/?retryWrites=true&w=majority


//404 handler and pass to error handler
server.use((req,res,next)=>{
    // const err=new Error("npt found");
    // err.status=404;
    // next(err);   this is one method we can also do it by http-error
    next(createError(404,"not found")) 
})


//error handler
server.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status: err.status || 500,
            message: err.message
        }
    })
})

server.listen(3000,()=>{
    console.log("this is product routing");
})