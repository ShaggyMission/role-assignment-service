const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const roleRoutes = require('./routes/roleRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/roles', roleRoutes);
app.use('/roles', swaggerRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Role Assignment Service running on port ${PORT}`);
  } catch (err) {
    console.error('DB connection error:', err);
  }
});
