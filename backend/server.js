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
const usersUri = process.env.USERS_URI;

//Первый Connection к инструментам
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true });
//Второй - к пользователям
const userConn = mongoose.createConnection(usersUri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true });

const connections = mongoose.connections;
const connection = connections[0];
const userconnection = connections[1];

connections[0].once('open', () => {
  console.log("MongoDB database connection established successfully");
  //console.log("Collections: ", Object.keys(connections[0].collections), " \n", Object.keys(connections[1].collections))
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

const Guitar = connection.model("Guitar", guitarScheme);
const Drum = connection.model("Drum", drumScheme);
const BassGuitar = connection.model("BassGuitar", bassGuitarScheme);
const Synthesizer = connection.model("Synthesizer", synthScheme);
const Instrument = connection.model("Instrument", instrumentScheme);

const errorInstrument = {_id:-1, species: 'Ошибка', name: 'Ошибка', description: 'Ошибка', price: 0, image: null};

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectID,
    name: String,
    surname: String,
    login: String,
    password: String,
    goods: Array
}, { versionKey: false });

const User = userconnection.model("User", userSchema);

app.get('/', (req, res)=>{
    console.log("Main page");
});

app.get('/guitars', (req, res)=>{
    Guitar.find({}, (err, docs) => {
        if (err) res.json(errorInstrument);
        else {
            res.json(docs);
        }
    });
});

app.get('/bass-guitars', (req, res)=>{
    BassGuitar.find({}, (err, docs) => {
        if (err) res.json(errorInstrument);
        else {
            res.json(docs);
        }
    });
});

app.get('/drums', (req, res)=>{
    Drum.find({}, (err, docs) => {
        if (err) res.json(errorInstrument);
        else {
            res.json(docs);
        }
    });
});

app.get('/synthesizers', (req, res)=>{
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
    ).then(result=>res.json(result.flatMap(x => x)));
});

app.get('/instrument/:id', (req, res) => {
    console.log(req.params.id)
    Promise.all(Object.keys(connection.collections).map(col =>
        mongoose.model(col, instrumentScheme.set('collection', col)).findById(req.params.id))
    ).then(result=>{
        {
            res.json(result.flatMap(x => x).filter(x => (x!=null))[0])
        }
    })
})

app.post("/register", urlencodedParser, (req, res) => {
    if(!req.body) return res.status(400).send(false);
    else return res.status(200).send(true);
    //response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});