const MessagesManagerMongo = require('../daos/mongo/messages.mongo.js');

const messagesManager = new MessagesManagerMongo()

const websocketFuncion = (socketServer) => {
	socketServer.on('connection', socket => {
		console.log(`Nuevo cliente conectado, id: ${socket.id}`)

		let allMessagesTxt;

		messagesManager.getMessages().then(result => {

			allMessagesTxt = JSON.stringify(result, "null", 2)

			socketServer.emit('chatLog', allMessagesTxt)
		})

		socket.on('newChatMessage', data => {

			console.log(data)
			messagesManager.addMessage(data)

		})
	})

}

module.exports = {
	websocketFuncion
}

