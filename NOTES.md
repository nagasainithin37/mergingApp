# Merging frontend and backend application

## Step 1 :

    Create a fresh react app and backend

## Step 2:

    copy index/app/server.js files and API files into root level of frontend part

## step 3:

    install all modules used in backend in the react application
    express
    mongdb
    bcryptjs
    jsonwebtoken
    express-async-handler

## Step 4:

    Create Build folder by using cmd
    npm run build

## Step 5:

    in server.js

    import path module and join
    const path=require('path')
    app.use(exp.static(path.loin(__dirname,'./build')))

    nodemon server to run
    npm run build if changes are made in frontend

## Step 6:

    use .env file to store secret values and keep file in git ignore

    npm install dotenv
    require('dotenv').config()
    let x=process.env.x to access x

## Step 7:

    If routing implemented handle non backend routes by  IMPLEMENTING FOLLOWING CODE

    app.use('*"(req,res)=>{
        res.sendFile(path.join(__dirname,'./build/index.html'))
    })

## Step 8:

    create a form for signup and to post the object use axios

    axios.post('path',obj)
    .then()
    .catch()

# Implementing Login Page

## Step 1:

    Setup redux store and create a slice for userLogin

## Step 2:

    If user login is successful save token  in local storage setItem getItem removeItem
    return the response
    else
    return rejectedWithValue(data)

# Uploading Images

## Step 1:

    create a input field for uploading images
    <input type="file" onchange={(event)=>onImageSelect(event)} {...register{'photo',requires:true}}>

    let [image,setImage]=useState(null)

    var onImageSelect=(event)=>{
        setImage(event.target.file[0])
    }

## Step 2:

    create object of formData to send images also in form submit

    var onformSubmit=(obj)=>{

        formData=new FormData()

        formData.append('userObj',JSON.stringify(obj))
        formData.append('photo',image)

        axios.post("",formData)
        .then()
        .catch()

## Step 3:

    use Cloudinary to store images

    install the following to use cloudinary
    cloudinary
    multer-storage-cloudinary
    multer

## Step 4:

    Setting up cloudinary in userApi

    var cloudinary=require('cloudinary').v2;
    const { CloudinaryStorage }=require('multer-storage-cloudinary');
    const multer=require('multer')

    cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
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

## Step 5:

    userApp.post('',upload.single("photo"),expressAsyncHandler(async(req,res)=>{

        //to get path of file use
        let loc=req.file.path
    }))

## Step 6:

    convert the string in fileData to usser object and delete photo in it and add the uploaded photo url

    let userObj=JSON.parse(req.body.userObj)
    delete
    userObj.profileImage=   req.file.path
    delete userObj.photo
