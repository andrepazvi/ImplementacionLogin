//Contiene la lógica para recibir datos de carritos 

const cartModel = require('../model/cart.model.js')

class CartManagerMongo {

    //Retorna todos los documentos de carritos
    async createCart(){
        try{
            let emptyProducts = {productId: null, 
                            quantity: 0}
            return await cartModel.create({products: emptyProducts})
        }catch(err){
        return new Error(err)
        }
    }    

    async addProductToCart(cid, pid){
        try {
           let foundCart = await cartModel.findOne({_id: cid})
          //console.log (foundCart)

          let productArray = foundCart.products 
          console.log(productArray) 
          let newProduct = {productId: pid, quantity: 1}   
          let foundId = false;

          productArray.forEach(element => {    
            if (element.productId == pid){
                element.quantity ++          
                foundId = true
                
            }
        })
            if (foundId){
                return await cartModel.updateOne({_id: cid},{products: productArray})     
            }
            else {
                productArray.push(newProduct)                                             
                return await cartModel.updateOne({_id: cid},{products: productArray})       
            }   
 
        
        }catch(error){
            return new Error(error)
        }
    }

    //Lista los productos en un carrito
    async showCartProducts(cid){
        try {
            
        //return await cartModel.findOne({_id: cid})    
        return await cartModel.findOne({_id: cid}).populate('products.productId')
        }catch(error){
            return new Error(error)
        }
    }

    //Elimina los productos en un carrito
    async deleteAllProductsFromCart(cid){
        try {
            return await cartModel.updateOne({_id: cid}, {products: []})    
            
            }catch(error){
                return new Error(error)
            }

    }

     //Actualiza la cantidad del producto seleccionado en el carrito buscado
     async updateProductQuantity(cid, pid, productQuantity){
        try {
            let foundCart = await cartModel.findOne({_id: cid})    
            let productArray = foundCart.products              
            let foundPid = false
            
            //recorremos el arreglo products en busca del id proporcionado por params
            productArray.forEach(element => {       
                if (element.productId == pid){
                    element.quantity = productQuantity           
                    foundPid = true                    
                }
            })

            if (foundPid){
                return await cartModel.updateOne({_id: cid},{products: productArray})       
            }
            else {
                
                return await {mensaje: "El producto no se encuentra en este carrito"}    
            }  

            
            }catch(error){
                return new Error(error)
            }

    }

      //Elimina el producto seleccionado del carrito
      async deleteProductFromCart(cid, pid){
        try {
            let foundCart = await cartModel.findOne({_id: cid})     
            let productArray = foundCart.products                 
            let foundPid = false
            let productIndex
            let newProductArray
            //console.log(productArray)
        
            productArray.forEach(element => {       
                if (element.productId == pid){
                    productIndex = productArray.indexOf(element)             
                    newProductArray = productArray.splice(productIndex, 1)     
                    foundPid = true                    
                }
            })

            //console.log(productIndex)
            //console.log(newProductArray)

            if (foundPid){
                return await cartModel.updateOne({_id: cid},{products: productArray})      
            }
            else {
                
                return await {mensaje: "El producto no se encuentra en este carrito"}    
            }  
            
            }catch(error){
                return new Error(error)
            }

    }

    //Agrega un arreglo de productos a un carrito
    async addProductArrayToCart(cid, newProductsArray){
        try {
            let foundCart = await cartModel.findOne({_id: cid})    
            let productArray = foundCart.products                    
               
            newProductsArray.forEach(element => {
            productArray.push(element)                              
          })
            
                                                                  
            return await cartModel.updateOne({_id: cid},{products: productArray}) 
             
        }catch(error){
            return new Error(error)
        }
    }

}

module.exports = CartManagerMongo