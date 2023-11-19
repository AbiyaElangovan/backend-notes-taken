require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const nodeRouter = require('./routes/nodeRouter')
const path = require('path')


const app = express();

app.use(express.json())
app.use(cors())

//Routes
app.use('/user',userRouter)
app.use('/api/notes',nodeRouter)


//connection
const connectionString = 'mongodb+srv://Kayalvizhi:zEhG94Ca1jgLI7S5@cluster0.fo1f9ik.mongodb.net/items?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});
// const URI = 'mongodb+srv://Kayalvizhi:zEhG94Ca1jgLI7S5@cluster0.fo1f9ik.mongodb.net/items?retryWrites=true&w=majority';
// mongoose.connect(URI,err=>{
//     if(err) throw err;
//     console.log('connect to mongodb')

// })


if( 'production' === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    });
}


//listen server
// const PORT = 5000
// app.listen(PORT,()=>console.log(`server is listening on port ${PORT}` ))


