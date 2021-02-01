const express = require("express")
const router = express.Router()

const { isSignedIn,isAuthenticate} = require("../controllers/auth")
const { getToken, processPayment } = require("../controllers/paymentb")
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticate, getToken)

router.post("/payment/braintree/:useId", isSignedIn, isAuthenticate, processPayment)


module.exports = router