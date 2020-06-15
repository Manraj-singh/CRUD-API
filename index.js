const express = require('express')
const app = express()
const mongoose = require('mongoose');
const userroutes = require('./routes/crud')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()


// app.use('/abc',express.static('public'));
// app.set('view engine','twig');


app.set('views','./views')
app.set('view engine','ejs');
//middlewares here
app.use(bodyParser.json())
app.use('/', userroutes )

app.get('/',(req,res)=>{
	res.send('home page working')
})



//connecting to DB
mongoose.connect(process.env.DB_URI,
 {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log("connected to DB ..")
});









const port = 3000
app.listen(port, () => console.log(`server runnning at http://localhost:${port}`))