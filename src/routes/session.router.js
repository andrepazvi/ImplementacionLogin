const { Router } = require('express')
const router = Router()
const userModel = require('../daos/model/user.model')

router.post('/login', async (req, res)=>{
		try{
            const {email, password} = req.body            

            console.log(req.body)
   
            if(email == "adminCoder@coder.com" && password == "admincoder123") {
                req.session.user = {
                    first_name: "Nombre Admin coder",
                    last_name: "Apellido Admin coder",
                    email: email,
                    role: "admin"
                }

                res.redirect('/products')

            }else{
            
            const userDB = await userModel.findOne({email, password})  
            
            if(!userDB) return res.send({status: "Error", message: "No existe el usuario"})

            req.session.user = {
                first_name: userDB.first_name,
                last_name: userDB.last_name,
                email: userDB.email,
                role: "user"
            }

            res.redirect('/products')                             
        }
        }catch(error){
            console.log(error)
        }


})


router.post('/register', async (req, res) => {
    const {first_name, last_name, email, date_of_birth, password} = req.body       

    if(!first_name || !last_name || !email || !date_of_birth || !password) return res.send({message: "Todos los campos son obligatorios"})
    
    const existEmail = await userModel.findOne({email})                             

    if (existEmail) return res.send({status: "Error", error: "email ya registrado"}) 

 
    const newUser = {
        first_name,
        last_name,
        email,
        date_of_birth,
        password                            
    }

    let resultUser = await userModel.create(newUser)                               

    res.status(200).send({message: 'registro exitoso'})
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return res.send({status: 'error', error: err})
        }
    })

    res.redirect('/login')  

})

module.exports = router

