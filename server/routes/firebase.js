const express = require('express');
const firebase = require('../controllers/firebase');
const router = express.Router();

router.post("/create",firebase.createuser)
router.get('/',firebase.getData)

module.exports = router