const exp=require('express')

const prodApp=exp.Router()

prodApp.use(exp.json())

const expressAsyncHandler=require('express-async-handler')

prodApp.post('/addprod',expressAsyncHandler(async(req,res)=>{
    let prodCollectionObj=req.app.get('prodCollectionObj')

    let result=await prodCollectionObj.findOne({id:req.body.id})
    
    if(result==null){
        await prodCollectionObj.insertOne(req.body)
        res.send({message:'Product created successfully'})
    }
    else{
        res.send({message:`product with id = ${req.body.id} already exists`})
    }

}))


// to Retrive all products

prodApp.get('/allprods',expressAsyncHandler(async(req,res)=>{
    let prodCollectionObj=req.app.get('prodCollectionObj')
    let result=await prodCollectionObj.find().toArray()
   
    res.send({message:'All Products are',payload:result})
}))

// To retrive a product by id
prodApp.get('/getprod/:id',expressAsyncHandler(async(req,res)=>{
    let prodCollectionObj=req.app.get('prodCollectionObj')
    let idx=(+req.params.id)
    let result=await prodCollectionObj.findOne({id:idx})
    if (result==null){
        res.send({message:'No Product found'})
    }
    else{
        res.send({message:'product found',payload:result})
    }
}))


//Update a product

prodApp.put('/updateprod',expressAsyncHandler(async(req,res)=>{

    let newObj=req.body;
    let prodCollectionObj=req.app.get('prodCollectionObj')
    let result=prodCollectionObj.findOne({id:newObj.id})
    if(res==null){
        res.send({message:'No product found to update'})
    }
    else{
        await prodCollectionObj.updateOne({id:newObj.id},{$set:{...newObj}})
        res.send({message:'product updated'})
    }
}))

//delete a product

prodApp.delete('/delete/:id',expressAsyncHandler(async(req,res)=>{
    let idx=(+req.params.id)
    let prodCollectionObj=req.app.get('prodCollectionObj')
    let result=prodCollectionObj.findOne({id:idx})
    if(res==null){
        res.send({message:'No product found to delete'})
    }
    else{
        await prodCollectionObj.deleteOne({id:idx})
        res.send({message:'product Deleted'})
    }
}))

module.exports=prodApp