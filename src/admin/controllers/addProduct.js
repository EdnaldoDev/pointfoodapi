import mongoose from 'mongoose'

import {Restaurante} from '../../schemas/db.js'

export const addItemToMenu=async(req, res)=>{
    const {newProduct}= req.body
    const restaurante=res.user

   try{
    restaurante.cardapio[newProduct.category].push(newProduct)
    await restaurante.save()
    res.json(restaurante)
   }catch(err){
    console.log(err)
    res.status(500).json({text:'Erro ao adiconar produto ao cardápio', err})
   }
}