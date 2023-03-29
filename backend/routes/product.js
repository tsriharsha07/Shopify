const express=require('express')

const router=express.Router()

const { getProducts,newProduct,getSingleProcduct,updateProdcut,deleteProduct, createProductReview, getProductReviews, deleteReview,getAdminProducts } = require('../controllers/productController')


const { isAuthenticatedUser,authorizeRoles } =require('../middlewares/auth')

router.route('/products').get(getProducts)

router.route('/admin/products').get(getAdminProducts)


router.route('/product/:id').get(getSingleProcduct)


router.route('/admin/product/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateProdcut).delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct);

router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct);

router.route('/review').put(isAuthenticatedUser,createProductReview)

router.route('/reviews').get(isAuthenticatedUser,getProductReviews)
router.route('/reviews').delete(isAuthenticatedUser,deleteReview)

module.exports=router