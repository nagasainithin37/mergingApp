const exp=require('express')

const userApp=exp.Router()

const expressAsyncHandler=require('express-async-handler')

const bcryptjs=require('bcryptjs')

const jwt=require('jsonwebtoken')

userApp.use(exp.json())

//Import cloudinary details

var cloudinary=require('cloudinary').v2;
const { CloudinaryStorage }=require('multer-storage-cloudinary');
const multer=require('multer')

cloudinary.config({
        cloud_name:"dwxywqi2p",
        api_key:"676589928348967",
        api_secret:"2sS4annEPgv87Uj3JmBttEypQSs",
        secret:true,
    })

const storage=new CloudinaryStorage({
    
    cloudinary:cloudinary,
    
    params:async(req,file)=>{
    
        return {
                folder:"merge",
                public_id:file.fieldname +'=' +Date.now(),
            };
        },
    });


var upload = multer({storage:storage})



// To create user
userApp.post('/createuser',upload.single("photo"),expressAsyncHandler(async(req,res)=>{

    let imgUrl=req.file.path
    const userCollectionObj=req.app.get('userCollectionObj')
     let userObj=JSON.parse(req.body.userObj)
     delete userObj.photo
     userObj={...userObj,'imgUrl':imgUrl}
     console.log(userObj)
     let result=await userCollectionObj.findOne({username:userObj})

     if (result==null){

         let hashPsw=await bcryptjs.hash(userObj.password,5)
         userObj={...userObj,'password':hashPsw}
         await userCollectionObj.insertOne(userObj)
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
        if(cmp===true){
            let secret_key=process.env.SECRET_KEY
            let token=jwt.sign({username:obj.username},secret_key,{expiresIn:600})
            res.send({message:'login Successful',payload:token,userDetails:result})
        }
        else{
            res.send({message:"Bad Authentication Try Again"})
        }
    }
}))



module.exports=userApp;