const express = require('express');
const sequelize = require('./config/database');
const { assignRole } = require('./controllers/roleController');
require('dotenv').config();

const app = express();
app.use(express.json());

app.post('/assign-role', assignRole);

const PORT = 3001;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Role Assignment Service running on port ${PORT}`);
  } catch (err) {
    console.error('DB connection error:', err);
  }
});
