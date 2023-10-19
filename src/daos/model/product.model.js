const {Schema, model} = require('mongoose')
const collection = 'products'	
const mongoosePaginate = require('mongoose-paginate-v2')    

const productSchema = new Schema({
	title: { type: String, required: true },
	description: {type: String, required: true },
	code: { type: String, required: true, unique: true },
    price: { type: Number },
    status: { type: Boolean },
    stock: { type: Number },
    category: {type: String },
    thumbnails: { type: String },
})

productSchema.plugin(mongoosePaginate)

const productModel = model(collection, productSchema)

module.exports =  productModel
