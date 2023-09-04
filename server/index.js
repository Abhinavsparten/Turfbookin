//import mongosee
const express=require('express')
//import logic file
const logic=require('./service/logic')
//app creation
const app=express()
//covert all json data to js
app.use(express.json())
// integrate frontend with server
const cors=require('cors')
app.use(cors({origin:'http://localhost:4200'}))

//import jwt

const jwt=require('jsonwebtoken')

const jwtMiddileware=(req,res,next)=>{
    
    try{
    //access token from request header
    const token=req.headers['access_token']
    //verify
    const data=jwt.verify(token,"secretkey123")
    console.log(data);

    next()
}
catch{      
            res.status(404).json({
            status:false,
            message:" please login",
            statusCode:404
        })
    
}
}

//request register
app.post('/register',(req,res)=>{
    logic.register(req.body.uid,req.body.uname,req.body.psw).then(result=>{

            //to change status code
        res.status(result.statusCode).json(result)
    })
})
//login
app.post('/login',(req,res)=>{
    logic.login(req.body.uid,req.body.psw).then(result=>{
        res.status(result.statusCode).json(result)    
    })
})
//single user details
app.get('/getUser/:uid',jwtMiddileware,(req,res)=>{
    logic.getUser(req.params.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
//add profile
app.post('/addprofile',(req,res)=>{
    logic.profileAdd(
        req.body.name,
        req.body.userid,
        req.body.age,
        req.body.pic,
        req.body.street,
        req.body.district,
        req.body.number).then(result=>{
      //to change status code
        res.status(result.statusCode).json(result)
    }) 
})
app.get('/profile/:uid',(req,res)=>{
    logic.getProfile(req.params.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
//add profile
app.post('/addturf',(req,res)=>{
    logic.turfAdd(
        req.body.turfid,
        req.body.turfname,
        req.body.place,
        req.body.district,
        req.body.pin,
        req.body.fee,
        req.body.image,
        req.body.pname,
        req.body.phone,
        req.body.status,
        req.body.acno,
        req.body.uid).then(result=>{
      //to change status code
        res.status(result.statusCode).json(result)
    }) 
})

app.get('/propturfview/:uid',(req,res)=>{
    logic.getallTurf(req.params.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})
app.get('/viewsingle/:courtid',(req,res)=>{
    logic.getsingleTurf(req.params.courtid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.get('/userturfview/:uid',(req,res)=>{
    logic.getallTurfuser(req.params.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.get('/userbook/:courtid',(req,res)=>{
    logic.getbookUser(req.params.courtid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/deleteac/:courtid', (req, res) => {
    logic.deleteac(req.params.courtid).then(data => {
        res.status(data.statusCode).json(data)
    })
})

app.put('/editturf',(req,res)=>{
    logic.turfEdit(
        req.body.courtid,
        req.body.turfname,
        req.body.place,
        req.body.district,
        req.body.pin,
        req.body.fee,
        req.body.image,
        req.body.pname,
        req.body.phone,
        req.body.status,
        req.body.acno
        ).then(result=>{
      //to change status code
        res.status(result.statusCode).json(result)
    }) 
})
app.post('/timeslot',(req,res)=>{
    logic.timeSlot(
        req.body.st,
        req.body.et,
        req.body.courtid,
        req.body.today,
        req.body.uid,
        req.body.user,
        req.body.courtname
        ).then(result=>{

            //to change status code
        res.status(result.statusCode).json(result)
    })
})

app.post('/moneytransfer',(req,res)=>{
    logic.moneyTransfer(
        req.body.tocno,
        req.body.urcno,
        req.body.psw,
        req.body.amount
      ).then(result=>{

            //to change status code
        res.status(result.statusCode).json(result)
    })
})
app.get('/viewbookings/:courtid',(req,res)=>{
    logic.getBookDetail(req.params.courtid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.delete('/deleteBooking/:courtid', (req, res) => {
    logic.deleteBooked(req.params.courtid).then(data => {
        res.status(data.statusCode).json(data)
    })
})

app.delete('/deleteAcc/:uid', (req, res) => {
    logic.deleteMain(req.params.uid).then(data => {
        res.status(data.statusCode).json(data)
    })
})

app.get('/viewbookin/:uid',(req,res)=>{
    logic.bookingdetailuser(req.params.uid).then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//port set
app.listen(3000,()=>{
    console.log("server created at port 3000");
})

