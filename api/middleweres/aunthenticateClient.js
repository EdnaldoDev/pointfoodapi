import { Restaurante } from "../schemas/db.js"

export async function AuthenticateClient(req, res, next){
    const [Bearer,storeToken]= req.headers.authorization.split(' ')
    if(!storeToken){
        res.status(401).send({error:'Token nao fornecido'})
    }
   try{
    const restaurante= await  Restaurante.find({storeToken}) 

    if(!restaurante){
        res.status(404).send('Restaurante não encontrado')
    }else{
        // //(restaurante)
        res.user=restaurante

        next()
    }
   }catch(err){
    //(err)
   }
}