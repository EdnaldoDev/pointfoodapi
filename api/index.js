import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv' 
import {connectDB} from './dbConnect.js'

import {login, signUp} from './admin/controllers/authController.js'
import {addItemToMenu} from './admin/controllers/addProduct.js'
import {updateInfos} from './admin/controllers/updateInfos.js'

import {listProducts} from './client/listProducts.js'

import {Authenticate} from './middleweres/authenticate.js'
import {AuthenticateClient} from './middleweres/aunthenticateClient.js'

import {newOrder} from './client/order.js'
dotenv.config()
const app= express()
const port=3001
const mongodbKey= process.env.MONGO_DB_KEY

app.use(express.json())
app.use(cors({origin:'*'}))
app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

// console.log(mongodbKey)
connectDB(mongodbKey)
app.post('/signup', async(req, res)=>{
  const restaurantData= req.body
  console.log(restaurantData)
  
    try {
      const push = await signUp(restaurantData);
      res.send(push);
    } catch (error) {
      console.error('Erro no cadastro:', error);
      res.status(500).send('Erro no cadastro'); // Envie uma resposta de erro 500
    }
})


app.post('/login', async(req, res)=>{
  const {email, password}=req.body


    try {
        const restaurante = await login(email, password);
        res.json({restaurante, text:'Login successfuly'});

      } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).send('Erro no login'); // Envie uma resposta de erro 500
      }
}) 


app.post('/add-product',Authenticate ,addItemToMenu)

app.post('/update-infos', Authenticate,  updateInfos )


//client 
app.get('/', (req, res)=>res.send('Hello world'))
app.get('/app/products',AuthenticateClient, listProducts)

app.post('/app/new-order',  AuthenticateClient, newOrder)
app.listen(port, ()=>console.log('server listencing on port ', port))
