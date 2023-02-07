const exp=require('express')

const app=exp()
const userApp=require('./APIs/userApp')
const prodApp=require('./APIs/productApp')
const mClient=require('mongodb').MongoClient
require('dotenv').config()

const path=require('path')
app.use(exp.static(path.join(__dirname,'./build')))

const DBurl=process.env.DATABASE_URL;

mClient.connect(DBurl)
.then((client)=>{
    console.log("Connection Successful")

    const DBobj=client.db('merge')
    const userCollectionObj=DBobj.collection('users')
    const prodCollectionObj=DBobj.collection('products')

    app.set('prodCollectionObj',prodCollectionObj)
    app.set("userCollectionObj",userCollectionObj)
    
})
.catch((err)=>{
    console.log(`Error in connection ${err.message}`)
})


//forward to user App
app.use('/users',userApp)

//forward to product app
app.use('/products',prodApp)


app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
})

app.use((req,res,next)=>{
    res.send({message:`Invalid path ${req.url}`})
})

//Error Handling Route
app.use((err,req,res,next)=>{
    res.send({message:'Error occured',reason:`${err.message}`})
})
const port=process.env.PORT
app.listen(port,()=>{console.log("server is listining")})