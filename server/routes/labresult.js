const express = require('express');
const router = express.Router();
const labresult = require('../controllers/labresult');
const { verifyToken } = require('../middleware/authorization');

router.get('/:id', verifyToken, labresult.getlabresultById);
router.put('/:id', verifyToken, labresult.updateLabresult);
router.delete('/:id', verifyToken, labresult.deleteLabresult);
router.get('/:id/provider', verifyToken, labresult.getLabProviderName)

module.exports = router;
