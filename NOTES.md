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
        res.sendFile(path.join(__dirname,'./build/index.js'))
    })

## Step 8:

    create a form for signup and to post the object use axios

    axios.post('path',obj)
    .then()
    .catch()
