const router = require("express").Router();
const auth = require('../controllers/auth')

router.post("/signup", auth.signup)
router.post("/login", auth.login)
router.post("/adminSignup", auth.adminSignup)
router.post("/forgetPassword", auth.forgetPassword)
router.post("/checkCode/:email", auth.chekCode)
router.post("/resetPassword/:email", auth.changePassword)

module.exports = router;