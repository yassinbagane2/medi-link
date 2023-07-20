const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const disease = require('../controllers/disease');


router.get('/:id', verifyToken, disease.getdiseases)
router.put("/:id", verifyToken, disease.updateDiseases)
router.delete("/:id", verifyToken, disease.deletDiseases)

module.exports = router