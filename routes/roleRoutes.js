const express = require('express');
const router = express.Router();
const { assignRole } = require('../controllers/roleController');

router.post('/assign-role', assignRole);

module.exports = router;
