const exp=require('express')

const userApp=exp.Router()

const expressAsyncHandler=require('express-async-handler')

const bcryptjs=require('bcryptjs')

const jwt=require('jsonwebtoken')

userApp.use(exp.json())

// To create user
userApp.post('/createuser',expressAsyncHandler(async(req,res)=>{

    const userCollectionObj=req.app.get('userCollectionObj')
    let result=await userCollectionObj.findOne({username:req.body.username})

    if (result==null){

        let hashPsw=await bcryptjs.hash(req.body.password,5)
        let obj=req.body
        
        await userCollectionObj.insertOne({...obj,'password':hashPsw})
        res.send({message:'User created successfully'})
    }
    else{
        res.send({message:'User already existed'})
    }
}))

// To Login 

userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const obj=req.body
    const userCollectionObj=req.app.get('userCollectionObj')
    let result=await userCollectionObj.findOne({username:obj.username})
    if(result==null){
        res.send({message:'No User Exists'})
    }
    else{
        let cmp=await bcryptjs.compare(obj.password,result.password)
        if(cmp==true){
            let secret_key=process.env.SECRET_KEY
            let token=jwt.sign({username:obj.username},secret_key,{expiresIn:600})
            res.send({mesasge:'login Successful',payload:token})
        }
        else{
            res.send({message:"Bad Authentication Try Again"})
        }
    }
}))



module.exports=userApp;