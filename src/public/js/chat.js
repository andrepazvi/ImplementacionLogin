const socket = io()


socket.on('chatLog', data=>{                                      
        console.log('Recibido el chatLog')
        document.getElementById("chatLog").innerHTML = data      
      
        
    })

    socket.on('evento_todos', data=>{
        console.log(data)
    })

    //Esta funcion se llama al momento de dar click en el boton del formulario para enviar el mensaje
    function addNewMessage() {

    console.log("Dentro de la funcion de añadir mensaje")

        const newMessage = {                                                          
            "user": document.getElementById('userForm').value,
            "message": document.getElementById('messageForm').value                  
        }

        socket.emit('newChatMessage', newMessage)                                       

    }

    