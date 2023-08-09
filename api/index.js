const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require("mongoose");
const userRouter = require('./router/user')
const cookieParser = require('cookie-parser')
const postRouter = require('./router/post')



const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/uploads', express.static(__dirname + '/uploads'))

const url = "mongodb+srv://Haitham:tArDbhHCvzeib8tW@myapp.4ajlkuo.mongodb.net/Blog?authMechanism=SCRAM-SHA-1"

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(url)
        console.log("Connected to Mongo DB")
    } catch (err) {
        console.log("error while connect to mongo " + err);
        process.exit()
    }
}
connectDB()

app.use('/', userRouter)
app.use('/', postRouter)




app.listen(3030)