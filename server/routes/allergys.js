const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const allergy = require('../controllers/allergys');


router.get('/:id', verifyToken, allergy.getAllergy)
router.put("/:id", verifyToken, allergy.updateAllergy)
router.delete("/:id", verifyToken, allergy.deletAllergy)

module.exports = router