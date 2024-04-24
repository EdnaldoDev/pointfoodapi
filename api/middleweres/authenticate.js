import { Restaurante } from "../schemas/db.js"

export async function Authenticate(req, res, next){
    //(req.body)

   try{
    const restaurante= await  Restaurante.findById(req.body._id) 

    if(!restaurante){
        res.status(404).send('Restaurante não encontrado')
    }else{
        res.user=restaurante
        next()
    }
   }catch(err){
    //(err)
   }
}