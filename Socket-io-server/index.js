const express = require("express")
const { createServer } = require("http")
const { Server } = require("socket.io")

const app = express()
const httpServer = createServer(app)

app.get("/" , (req , res) => { 
    res.send("hola mundo").status(200)
})

const io = new Server(httpServer , { 
    cors: { 
        origin: "*", 
        methods: ['GET' , 'POST' , 'PUT' , 'DELETE' , 'OPTIONS']
    }
})

io.on('connection' , (socket) => { 
    let nombre;
    socket.on('conectado', (nomb)=> { 
        nombre = nomb;
        socket.broadcast.emit('mensajes', {nombre: nombre, mensaje: 'se ha conectado'})
        console.log('A user coneccted')
    })

    socket.on('mensaje' , (nombre , mensaje) => { 
        io.emit("mensajes" , {nombre , mensaje})
    })

    socket.on('disconnect' , () => { 
        io.emit('mensajes' , {servidor: "Servidor" , mensaje: `${nombre} se ha desconectado`})
    })
})

httpServer.listen(8080 , () => { 
    console.log("Servidor funcionando en http://localhost:8080")
})