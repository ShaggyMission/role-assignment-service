const express = require('express');
const cors = require('cors');
const roleRoutes = require('./routes/roleRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/roles', roleRoutes);
app.use('/roles', swaggerRoutes);

module.exports = app;
