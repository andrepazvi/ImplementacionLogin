
const express = require('express')
const handlebars = require('express-handlebars')                
const {Server} = require('socket.io')                           
const session = require('express-session')
const MongoStore = require('connect-mongo')                     

const routerServer = require('./routes/index.js')	                  
const objectConfig = require('./config/configServer.js')              
const { websocketFuncion } = require('./utils/socketLogic.js')

const app = express()

//Configuración de handlebars:
app.engine('handlebars', handlebars.engine())                   
app.set('views', __dirname+'/views')                      
app.set('view engine', 'handlebars')                       
app.use(express.static(__dirname+'/public'))

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))
app.use(session({
	store: new MongoStore({		
		mongoUrl: "mongodb+srv://andreapaz:mongo@cluster2.ut0jbea.mongodb.net/?retryWrites=true&w=majority",
		mongoOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true
		},
		ttl: 600000*5, 		
		retries: 0,			
	}),
   
	secret: 'secretCoder',
	resave: false,
	saveUninitialized: false
}))

objectConfig.connectDB()                                

app.use(routerServer)	                             

const httpServer = app.listen(PORT, (err) => {
if(err) console.log('Error en el servidor', err)
console.log(`Escuchando en el puerto: ${PORT}`)
})

const socketServer = new Server(httpServer)

websocketFuncion(socketServer)