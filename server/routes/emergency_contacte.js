const router = require("express").Router();
const emergencyContact = require('../controllers/emergency_contact');
const { verifyToken } = require("../middleware/authorization");


router.get("/:id", verifyToken, emergencyContact.getEmergencyContact)
router.put("/:id", verifyToken, emergencyContact.updateEmergencyContact)
router.delete("/:id", verifyToken, emergencyContact.deletEmergencyContact)

module.exports = router;