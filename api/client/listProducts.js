import {Restaurante} from '../schemas/db.js'



export const listProducts=async (req, res)=>{
    // const idRestaurante= req.query.storeToken
    
    const restaurante= res.user

    if(!restaurante){
        res.status(401).send('Erro ao buscar dados')
    }

    const restaurantData={
        _id:restaurante._id,
        nome: restaurante.nome,
        telefone: restaurante.telefone,
        cardapio:restaurante.cardapio,
        informacoes_negocio:restaurante.informacoes_negocio,
        storeToken:restaurante.storeToken
    }
    res.status(200).json(restaurantData)
}


