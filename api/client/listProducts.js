import {Restaurante} from '../schemas/db.js'



export const listProducts=async (req, res)=>{
    // const idRestaurante= req.query.storeToken
    
    const restaurante= res.user

    if(!restaurante){
        res.status(401).send('Erro ao buscar dados')
    }

    const restaurantData={
        _id:restaurante[0]._id,
        nome: restaurante[0].nome,
        telefone: restaurante[0].telefone,
        cardapio:restaurante[0].cardapio,
        informacoes_negocio:restaurante[0].informacoes_negocio,
        storeToken:restaurante[0].storeToken
    }
    res.status(200).json(restaurantData)
}


