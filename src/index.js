import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import bodyParser from 'body-parser';
require('./config/config');

const app = express();


//config
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//global config routes
app.use(require('./routes/index'));

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.connection.on("error", console.error.bind(console, "connection error"));
mongoose.connection.once("open", function(callback) {
    console.log("Connection Succeeded on: ", process.env.DB_URL);
});

app.listen(process.env.PORT, () => console.log('escuchando puerto 3000'));