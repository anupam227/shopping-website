const express = require("express");
const router = express.Router();

const { getProductById, createProduct, getProduct, photo, deleteProduct, updateProduct, getAllProducts, getAllUniqueCategories } = require("../controllers/product");
const { isAdmin, isAuthenticate, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");


//all params
router.param("userId", getUserById);
router.param("productId", getProductById);

//create route
router.post("/product/create/:userId", isSignedIn, isAuthenticate, isAdmin, createProduct );

//get route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticate, isAdmin, deleteProduct);

//update route
router.put("/product/:productId/:userId", isSignedIn, isAuthenticate, isAdmin, updateProduct);

//listing route
router.get("/products", getAllProducts);

//listing categories
router.get("/products/categories", getAllUniqueCategories);

module.exports = router;