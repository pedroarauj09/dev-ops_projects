  


//Servidor
const express = require('express')
const server = express() // Servidor


//config nunjucks (template engine)
const nunjucks = require('nunjucks') //Ferramenta para modificar o html
const { pageLanding, pageStudy, pageGiveClass, saveClasses} = require('./pages')
nunjucks.configure('src/views', {
  express:server,
  noCache: true,  
})

//Config of server

server
//reach data from req body, for hide the data
.use(express.urlencoded({ extended: true}))
//config estatic archives

.use(express.static("public"))

//aplication of royas
.get("/", pageLanding)

.get("/study", pageStudy)

.get("/give-classes", pageGiveClass)

.post("/save-classes",saveClasses)
    
//server start
.listen(5500)