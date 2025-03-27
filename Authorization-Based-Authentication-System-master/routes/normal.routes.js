const express= require('express')
const router= express.Router()
const { handlePostDataForSignUp }= require('../controllers/sign-up.controller')
const { handlePostOTPSubmission }= require('../controllers/otpVerification.controller')
const { handlePostLogin }= require('../controllers/login.controller')
const { setRoleUser, setRoleAdmin }= require('../middlewares/setRoles.middleware')
const { AuthMiddlware }= require('../middlewares/authentication.middleware')
const { handleUserGetReq, handleAdminGetReq, handleGetLogout }= require('../controllers/get.controller')



router.post("/sign-up", handlePostDataForSignUp )

router.post("/sign-up/otp", handlePostOTPSubmission)

router.post("/login", handlePostLogin)

router.get("/user", setRoleUser, AuthMiddlware, handleUserGetReq)

router.get("/admin", setRoleAdmin, AuthMiddlware, handleAdminGetReq)

router.get("/user/logout", setRoleUser, AuthMiddlware, handleGetLogout)

router.get("/admin/logout", setRoleAdmin, AuthMiddlware, handleGetLogout)









module.exports= router