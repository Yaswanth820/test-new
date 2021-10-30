const express = require('express');
const cors = require('cors');
const md5 = require('md5');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once(`open`, ()=>{
    console.log('Mongoose is running');
});

app.listen(PORT, ()=>{
    console.log('Server started at `http://localhost:8000/`');
});

var i = 0;
app.get('/',(req, res)=>{
    //res.send('<h1>hello</h1>');
    res.send(`${i++}`);
});

// app.get('/:string',(req, res)=>{
//     res.send(req.params.string)
// });

app.post('/',(req, res) => {
    console.log(req.body);
    res.status(200).send('Image Received');
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    res.status(200).send(`http://localhost:8000/${md5(name).slice(0, 6)}`);
});

app.get('/find/:string/', (req, res) => {
    res.send(`Found something at ${req.path}`);
});
