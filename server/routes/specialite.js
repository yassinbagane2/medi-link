const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const speciality = require('../controllers/specialite');


router.post('/', verifyToken, speciality.createSpeciality);
router.get('/:id', verifyToken, speciality.getSpeciality);
router.put('/:id', verifyToken, speciality.updateSpeciality);
router.delete('/:id', verifyToken, speciality.deleteSpeciality);
router.get('/', verifyToken, speciality.getSpecialities);



module.exports = router;