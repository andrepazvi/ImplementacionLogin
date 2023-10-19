const {Router} = require('express')


const productRouter = require('./product.router.js');  	
const cartRouter = require('./cart.router.js');
const viewRouter = require('./views.router.js');    
const sessionRouter = require ('./session.router.js')

	
const router = Router()
	

router.use('/api/products', productRouter)	                     
router.use('/api/carts', cartRouter)
router.use ('/api/session', sessionRouter)
router.use('/', viewRouter)											


router.use('/', (req, res)=>{

		res.redirect('/login')  
		//res.send('Hola mundo')
})




module.exports = router	
