const Product = require("../models/products");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id)=> {
    Product.findById(id).populate("category").exec((err, product) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with images"
            });
        }


        //Destructing the fields
        const {name, description, stock, price, category} = fields;
        if(!name || !description || !stock || !category || !price){
            return res.status(400).json({
                error: "Please include all fields"
            });
        }

        //restriction on the fields
        let product = new Product(fields);

        //handle file size
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File is too Big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "saving tshirt to DB failed"
                });
            }
            res.json(product);
        })
    });
};

exports.getProduct = (req, res)=> {
    req.product.photo = undefined;
    return res.json(req.product);
};

exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                error: "Unable to remove product"
            });
        }
        res.json({
            message: "Product remove successfully"
        });
    });
};

exports.updateProduct = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Problem with images"
            });
        }

        //update code
        let product = req.product;
        product = _.extend(product, fields);

        //handle file size
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File is too Big"
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to 
        product.save((err, product) => {
            if(err){
                return res.status(400).json({
                    error: "Updation failed"
                });
            }
            res.json(product);
        })
    });
}

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    // let sortBy = req.query.sortBy ? req.query.sortBy : _id;

    Product.find().select("-photo").populate("category").limit(limit).exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "No product found"
            });
        }
        res.json(products);
    });
};

exports.updateStock = (req, res, next) => {
    let myOperation = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id: prod._id},
                updateOne: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        };
    });
    Product.bulkWrite(myOperation, {}, (err, products) => {
        if(err){
            return res.status(400).json({
                error: "Bulk opeartion failed"
            });
        }
        next();
    });
};

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No category Found"
            });
        }
        res.json(category);
    });
};