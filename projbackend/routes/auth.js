var express = require("express");
var router = express.Router();
const {check,validationResults} = require("express-validator");
const {signup,signout,signin, isSignedIn} = require("../controllers/auth");

router.post("/signup",[
    check("name","Name should be atleast 3 char long").isLength({min: 3}),
    check("email","email is required").isEmail()
], signup);

router.post("/signin",[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min: 1})
], signin);

router.get("/signout",signout);

router.get("/testroute",isSignedIn, (req,res)=> {
    res.send("A protected route")
});

module.exports = router;