const Product = require('../models/product')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary')



exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    }
    else {
        images = req.body.images
    }

    let imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'Products'
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }



    req.body.user = req.user.id
    req.body.images = imagesLinks

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments()

    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter()

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length
    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query.clone();

    res.status(200).json({
        success: true,
        productCount,
        filteredProductsCount,
        resPerPage,
        products

    })
})

//Get Admin all Products => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {

    const products = await Product.find()
    res.status(200).json({
        success: true,
        products

    })
})

//Get Single Product => /api/v1/product/:id
exports.getSingleProcduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})


//Update Product => /api/v1/admin/procduct/:id

exports.updateProdcut = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    let images = []

    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    }
    else {
        images = req.body.images
    }

    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        let imagesLinks = []

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'Products'
            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLinks
    }





    req.body.user = req.user.id

    res.status(200).json({
        success: true,
        product
    })
})

//Delete Product => /api/v1/admin/product/:id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }
    //Deleting images associated with product
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product is deleted"
    })


})


//Create new review => api/v1/review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }


    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user.id.toString()
    )
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user.id.toString()) {
                review.comment = comment;
                review.rating = rating
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
    await product.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true
    })


})


//get product reviews /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//delete product reviews /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(r => r._id.toString() !== req.query.id.toString())
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true
    })


    res.status(200).json({
        success: true
    })
})
