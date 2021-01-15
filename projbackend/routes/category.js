const express = require("express");
const router = express.Router();

const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, removeCategory } = require("../controllers/category");
const { isAdmin, isSignedIn, isAuthenticate} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { update } = require("../models/user");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

//actual router
router.post("/category/create/:userId", isSignedIn, isAuthenticate, isAdmin, createCategory);

//read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);


//update route
router.put("/category/:categoryId/:userId" , isSignedIn, isAuthenticate, isAdmin, updateCategory);

//delete route
router.delete("/category/:categoryId/:userId" , isSignedIn, isAuthenticate, isAdmin, removeCategory);

module.exports = router;