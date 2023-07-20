const express = require('express');
const router = express.Router();
const radiographie = require('../controllers/radioagraphie');
const { verifyToken } = require('../middleware/authorization');

router.get('/:id', verifyToken, radiographie.getRadiographie);
router.put('/:id', verifyToken, radiographie.updateRadiographie);
router.delete('/:id', verifyToken, radiographie.deleteRadiographie);
router.get("/:id/provider", verifyToken, radiographie.getRadioProviderName)

module.exports = router;
