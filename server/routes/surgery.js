const router = require("express").Router();
const surgery = require('../controllers/surgery');
const { verifyToken } = require("../middleware/authorization");


router.get("/:id", verifyToken, surgery.getSurgery)
router.put("/:id", verifyToken, surgery.updateSurgery)
router.delete("/:id", verifyToken, surgery.deleteSurgery)
router.get('/:id/provider', verifyToken, surgery.getSurgeryProvider)

module.exports = router;