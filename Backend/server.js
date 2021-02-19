const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config();

// set up express app
const app = express();
const port = 8081;

app.use(cors());
app.use(bodyParser.json());

//const ATLAS_URI = "mongodb+srv://kelvin_0179:zh3OYBOESPY2NPWt@cluster0.dtdnj.mongodb.net/Cluster0?retryWrites=true&w=majority?authSource=yourDB&w=1";
const ATLAS_URI = "mongodb://localhost/xmemedb";
mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB Database connection established successfully");
});

app.use('', require('./routes/api'));
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//listen for request
app.listen(port, function () {
    console.log(`Now listening for Requests on Port : ${port}`);
})
//for swagger
app.listen(8080, function () {
    console.log(`Now listening for Requests on Port : 8080`);
})