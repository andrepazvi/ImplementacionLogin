const {connect} = require('mongoose')

const url = "mongodb+srv://andreapaz:mongo@cluster2.ut0jbea.mongodb.net/?retryWrites=true&w=majority"      
                                                                                                               

module.exports = {
    connectDB: () => { 
        connect(url) 
        console.log('Base de datos conectada') 
    }}