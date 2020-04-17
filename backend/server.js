const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

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
/*const Drum = mongoose.model("Drum", drumScheme);
const BassGuitar = mongoose.model("BassGuitar", bassGuitarScheme);
const Synthesizer = mongoose.model("Synthesizer", synthScheme);
const Instrument = mongoose.model("Instrument", instrumentScheme);*/

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
    ).then(result=>res.json(result.flatMap(x => x)[0]))
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});