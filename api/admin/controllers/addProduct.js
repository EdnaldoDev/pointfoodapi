import mongoose from 'mongoose'

import {Restaurante} from '../../schemas/db.js'

export const addItemToMenu=async(req, res)=>{
    const { newProduct } = req.body;
    const restaurante = res.user;

    try {
        // Verificar se a categoria existe, caso contrário, inicializá-la como um array vazio
        if (!restaurante.cardapio[newProduct.category]) {
            restaurante.cardapio[newProduct.category] = [];
        }

        restaurante.cardapio[newProduct.category].push(newProduct);
        await restaurante.save();
        res.json(restaurante);
    } catch (err) {
        console.log(err);
        res.status(500).json({ text: 'Erro ao adicionar produto ao cardápio', err });
    }
}
