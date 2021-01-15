const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticate, isSignedIn } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { getOrderById, createOrder, getAllOrders, getOrderStatus, updateStatus } = require("../controllers/order");
const { updateStock } = require("../controllers/product");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//actual route
router.post("/order/create/:userId" ,isSignedIn, isAuthenticate, pushOrderInPurchaseList, updateStock, createOrder);
router.get("order/allOrder/:userId", isSignedIn, isAuthenticate, isAdmin, getAllOrders);

//get status routes
router.get("/order/status/:userId", isSignedIn, isAuthenticate, isAdmin, getOrderStatus);
router.post("/order/:orderId/status/:userId", isSignedIn, isAuthenticate, isAdmin, updateStatus);

module.exports = router;