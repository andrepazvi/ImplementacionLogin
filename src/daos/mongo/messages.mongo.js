//Contiene la logica para guardar los mensajes de chat en la base de datos
const messagesModel = require('../model/message.model.js') 

class MessagesManagerMongo {

//guardar mensaje nuevo
async addMessage(newMessage){
    try{
        return await messagesModel.create(newMessage)  
    }catch(error){
        return new Error(error)
    }

}

//Leer los mensajes
async getMessages(){
    try{
        return await messagesModel.find() 
    }catch(error){
        return new Error(error)
    }
}
}

module.exports = MessagesManagerMongo