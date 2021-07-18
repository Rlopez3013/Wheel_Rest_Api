const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const brands = require('../src/routes/brands');
const makers = require("../src/routes/makers");
const models_tires = require("../src/routes/Models_Tires");
const sizes = require("../src/routes/sizes");
const models = require("../src/routes/models");
const tires = require("../src/routes/tires");
const seasons = require("../src/routes/seasons");
const cors = require('cors');

// Port setting
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/api/brands', brands);
app.use('/api/makers', makers);
app.use('/api/models_tires',models_tires);
app.use('/api/sizes', sizes);
app.use('/api/models', models);
app.use('/api/tires', tires);
app.use('/api/seasons',seasons);

// Routes
 app.get('/', (req, res) => {
   res.send('Tire Homepage');
 });

//Starting the Server
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));