const {Schema, model} = require('mongoose')
const collection = 'carts'

const cartSchema = new Schema({
	products: [{productId: {type: Schema.Types.ObjectId, ref: "products"}, quantity: Number}]
	
})

const cartModel = model(collection, cartSchema)

module.exports = 
	cartModel
