import mongoose from 'mongoose'

import {Restaurante} from '../../schemas/db.js'

export const updateCardapio=async (req, res)=>{
    const { newCardapio,category, permission} = req.body;
    const restaurante = res.user;

    // console.log(newCardapio)

    try {
        // Verificar se newCardapio é um objeto não vazio
        if (typeof newCardapio === 'object' && newCardapio.length >= 0 && permission) {
            // Substituir completamente o cardápio existente pelo novo cardápio
            restaurante.cardapio.set(category, newCardapio);
            await restaurante.save();

            const updatedRestaurante = await Restaurante.findById(req.body._id)

            res.json({ text: 'Informações atualizadas', restaurant:updatedRestaurante});
        }
    } catch (err) {
        console.log('error in updateProduct.js', err);
        res.status(500).json({ text: 'Erro ao atualizar o cardápio no banco de dados', err });
    }
}