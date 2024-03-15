import mongoose from 'mongoose'

import {Restaurante} from '../../schemas/db.js'

export const addItemToMenu=async(req, res)=>{
    const { newProduct, category } = req.body;
    const restaurante = res.user;
    try {
        if (!restaurante.cardapio) {
            res.send('Restaurante nao encontrado')
        }
        // Verificar se a categoria existe, caso contrário, inicializá-la como um array vazio
        if (!restaurante.cardapio.get(category)) {
            restaurante.cardapio.set(category, [])
        }

        restaurante.cardapio.set(category, [...restaurante.cardapio.get(category), newProduct])
        await restaurante.save();
        res.json(restaurante);
    } catch (err) {
        console.log(err);
        res.status(500).json({ text: 'Erro ao adicionar produto ao cardápio', err });
    }
}
