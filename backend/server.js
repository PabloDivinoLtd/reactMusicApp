const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require("body-parser");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  console.log("Collections: ", Object.keys(connection.collections))
});

const instrumentScheme = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: String,
    species: String,
    description: String,
    price: Number,
    image: mongoose.Schema.Types.ObjectID
}, { versionKey: false });

const guitarScheme = instrumentScheme.clone().set('collection', 'guitars');
const bassGuitarScheme = instrumentScheme.clone().set('collection', 'bass-guitars');
const drumScheme = instrumentScheme.clone().set('collection', 'drums');
const synthScheme = instrumentScheme.clone().set('collection', 'synthesizers');

const Guitar = mongoose.model("Guitar", guitarScheme);
const Drum = mongoose.model("Drum", drumScheme);
const BassGuitar = mongoose.model("BassGuitar", bassGuitarScheme);
const Synthesizer = mongoose.model("Synthesizer", synthScheme);
const Instrument = mongoose.model("Instrument", instrumentScheme);

const errorInstrument = {_id:-1, species: 'Ошибка', name: 'Ошибка', description: 'Ошибка', price: 0, image: null};

app.get('/', (req, res)=>{
    res.send('Hello');
    console.log("Main page");
});

app.get('/guitars', (req, res)=>{
    console.log("Guitars");
    Guitar.find({}, (err, docs) => {
        if (err) res.json(errorInstrument);
        else {
            res.json(docs);
        }
    });
});

app.get('/bass-guitars', (req, res)=>{
    console.log("Bass-Guitars");
    BassGuitar.find({}, (err, docs) => {
        if (err) res.json(errorInstrument);
        else {
            res.json(docs);
        }
    });
});

app.get('/drums', (req, res)=>{
    console.log("Drums");
    Drum.find({}, (err, docs) => {
        if (err) res.json(errorInstrument);
        else {
            res.json(docs);
        }
    });
});

app.get('/synthesizers', (req, res)=>{
    console.log("Synthesizers");
    Synthesizer.find({}, (err, docs) => {
        if (err) res.json(errorInstrument);
        else {
            res.json(docs);
        }
    });
});

app.get('/instr', (req, res) => {
    Promise.all(Object.keys(connection.collections).map(col =>
            mongoose.model(col, instrumentScheme.set('collection', col)).find())
    ).then(result=>res.json(result.flatMap(x => x)))

    console.log("Instruments");
});

app.get('/instrument/:id', (req, res) => {
    console.log(`Instrument id:${req.params.id}`)

    Promise.all(Object.keys(connection.collections).map(col =>
        mongoose.model(col, instrumentScheme.set('collection', col)).findById(req.params.id))
    ).then(result=>{
        res.json(result.flatMap(x => x).filter(x => (x!=null))[0])
    })
})

app.post("/register", urlencodedParser, (request, response) => {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    return response.sendStatus(200);
    //response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});