import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import http from 'http'

import {Server} from 'socket.io'

import {connectDB} from './dbConnect.js'



import {login, signUp} from './admin/controllers/authController.js'
import {addItemToMenu} from './admin/controllers/addProduct.js'
import {updateInfos} from './admin/controllers/updateInfos.js'
import { newOrder } from './admin/controllers/newOrder.js'

import {listProducts} from './client/listProducts.js'

import {Authenticate} from './middleweres/authenticate.js'

import { updateCardapio } from './admin/controllers/updateProduct.js'
import {updateCategory} from './admin/controllers/addCategory.js'


dotenv.config()


const app= express()
const server= http.createServer(app)
export const io = new Server(server,{
  cors:{
    origin:"*",
    method:['GET', 'POST']
  }
})

const port=3001
const mongodbKey= process.env.MONGO_DB_KEY

app.use(express.json())
app.use(cors({origin:"*"}))
app.use((req, res, next)=>{
  // res.header('Access-Control-Allow-Origin', 'https://pointfood.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

connectDB(mongodbKey)

app.post('/signup', async(req, res)=>{
  const restaurantData= req.body
  
    try {
      const push = await signUp(restaurantData);
      
      res.status(push.status).json(push)
     

    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).send('Erro no cadastro'); // Envie uma resposta de erro 500
    }
})


app.post('/login', async(req, res)=>{
  const {email, password}=req.body


    try {
        const restaurant = await login(email, password);
        
        if(restaurant){
          res.status(200).json({restaurant, text:'Login successfuly'});
        }

      } catch (error) {
        res.status(500).json({text:String(error)}); // Envie uma resposta de erro 500
      }
}) 


app.post('/add-product',Authenticate ,addItemToMenu)

app.post('/update-infos', Authenticate,  updateInfos )

app.post('/update-cardapio', Authenticate, updateCardapio)
app.post('/add-category', Authenticate, updateCategory)
app.post('/delete-category', Authenticate, updateCategory)
app.post('/new-order', Authenticate, newOrder)

//client 
app.get('/', (req, res)=>res.send('Hello world'))
app.post('/app/products',Authenticate, listProducts)

app.post('/app/new-order',Authenticate, newOrder)

const connectedSockets = {};

io.on("connection", (socket) => {
  // disconnectAllClients()
  socket.on('connected', (clientId) => {
    if(connectedSockets[clientId]){
      console.log("Cliente ja conectado:", clientId);
      return;
    }
    // Adicionar o socket conectado ao objeto de sockets conectados
      connectedSockets[clientId] = socket;
      console.log("Cliente conectado:", clientId);
  });

  socket.on('new-order', (data) => {
    // Enviar a mensagem para todos os sockets conectados
      connectedSockets['adm001']?.emit('new-order', data)
      //("Nova mensagem enviada para o cliente:", 'adm001');
  });

  socket.on('confirmOrder',(data)=>{
    //(data)
    connectedSockets[data.clientId]?.emit('confirmOrder', data.obj)
    //("Nova mensagem enviada para o cliente:", data.clientId);
  })

  socket.on('orderStatusChanged', (data)=>{
    connectedSockets[data.clientId]?.emit('orderStatusChanged', data.obj)
    //("Nova mensagem enviada para o cliente:", data.clientId);
  })

  socket.on("disconnect", () => {
      // Remover o socket desconectado do objeto de sockets conectados
      for (const clientId in connectedSockets) {
          if (connectedSockets[clientId] === socket) {
              delete connectedSockets[clientId];
              //("Cliente desconectado:", clientId);
              break;
          }
      }
  });
});

function disconnectAllClients() {
  // Iterar sobre todos os sockets conectados
  io.sockets.sockets.forEach(socket => {
      // Desconectar o socket
      socket.disconnect(true);
  });

  //('Todos os clientes foram desconectados.');
}


server.listen(port, ()=>console.log('server listencing on port ', port))
