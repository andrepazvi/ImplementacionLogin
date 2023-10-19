const { Router } = require('express')
const router = Router()

const ProductManager = require('../daos/mongo/product.mongo.js')
const productManager = new ProductManager()

const CartManager = require('./../daos/mongo/cart.mongo.js')  
const cartManager = new CartManager()

router.get('/chat', (req, res)=>{
		
res.render('chat', {})

})

router.get('/products', async (req, res) => {
    try{
    
        const {limit=5} = req.query
        const {page=1} = req.query
        const {query=null} = req.query
        const {sort} = req.query
    
        const products = await productManager.getProducts(limit, page, query, sort)
        
        const productsList = products.docs
        const hasPrevPage = products.hasPrevPage
        const hasNextPage = products.hasNextPage
        const prevPage = products.prevPage
        const nextPage = products.nextPage
        const productLimit = products.limit

        //console.log(productsList)

        const userFirst_name = req.session.user.first_name                          
        const userLast_name = req.session.user.last_name                           
        const role = req.session.user.role

        res.render('products', {userFirst_name, userLast_name, role, productsList, hasPrevPage, hasNextPage, prevPage, nextPage, productLimit})
        
    }catch(error){
        console.log(error)
        }
      
})

//Vista que muestra todos los productos en un carrito
router.get('/carts/:cid', async (req, res) => {
    try{
        
        const {cid} = req.params
        const cart = await cartManager.showCartProducts(cid)
        
        console.log(cart)
       
        /*
        const productsInCartList = cart.products
        console.log(productsInCartList)
        */

        res.render('cart', {cart})
        
    }catch(error){
        console.log(error)
        }
    
})

//Plantilla de registro
router.get('/register', (req, res) => {
    res.render('register', {})
})

//Plantilla de login
router.get('/login', (req, res) => {
    res.render('login', {})
})


module.exports = router