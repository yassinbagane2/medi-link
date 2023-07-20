const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const metrics = require('../controllers/metrics');


router.post('/', verifyToken, metrics.createmetrics);
router.get('/:id', verifyToken, metrics.getmetrics);
router.put('/:id', verifyToken, metrics.updatemetrics);
router.delete('/:id', verifyToken, metrics.deletemetrics);
router.get('/', verifyToken, metrics.getallmetrics);



module.exports = router;