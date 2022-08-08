const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const cors = require('cors');

/* MIDDLEWARE  */
const isAutherized = require('./middleware/isAuthorised')
// Load middleware
app.use(bodyParser.json());
app.use(cors());

// routes
let Task = require('./task/task.routes');
let List = require('./list/list.routes');
let USer = require("./user/user.routes");


app.use('/v2/task/',isAutherized,Task);
app.use('/v2/list/',isAutherized,List);

// User Routes

app.use('/users',USer)

app.get('',(req,res)=>{
    res.send("Hi dev")
})

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
})