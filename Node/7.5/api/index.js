const express = require("express")
const cors = require("cors")
const cors = require("body-parser")

const config = require("./config")
console.log(config)

const app = express()//בריאת האפליקציה, מפה הכל מתחיל
app.use(cors())
app.use(bodyParser.json({extends: true}))
app.use((req, res, next) =>{
    console.log(req.path)
    console.log(new Date().toISOString())
    console.log("I am in middleware")
    next()
})


app.get("/api/health-check" , (req , res , next) =>{
    console.log(req.query)
    res.send("Server is up and running")
})

//

app.get("/api/authenticate", (req , res , next) =>{
    const token = req?.query?.token
    if(token === "t1234"){
        return res.send("User Authorized")
    }
    else{
        return res.status(401).send("Sorry , User UnAuthorized")    }
})

const users = []
app.get("/auth/register", (req,res,next) =>{
    const userName = req.query.userName
    const password = req.query.password
    if(userName && password){
        users.push({userName , password})
        return res.send("User registered succecfully")
    }
    else{
        return res.status(400).send("Missing userName or Password") 
    }
})

app.get("/auth/login", (req,res,next) =>{
    const userName = req.query.userName
    const password = req.query.password
    if(userName && password){
        const foundUser = users.find(u => u.userName === userName && u.password === password)
        if(foundUser){
            return res.send("User logged in succecfully")
        }else{
            return res.send("Missing userName or Password") 
        }   
    }
    else{
        return res.status(400).send("Missing userName or Password") 
    }
})

app.get("/users", (req, res, next) => {
    res.json(users)
})

app.listen(config.port , (e) =>{
    if(e){
        console.log(e)
    }
    else{
        console.log(`Listening to PORT: ${config.port}`)
    }
})