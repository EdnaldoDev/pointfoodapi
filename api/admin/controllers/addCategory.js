import mongoose from 'mongoose'

import {Restaurante} from '../../schemas/db.js'

export const addCategory=async (req, res)=>{
    const { newCategory} = req.body;

    
    const restaurante = res.user;

    try {
        // Verificar se restaurante é um documento válido do modelo Restaurante
        if (!restaurante || !restaurante.cardapio) {
            return res.status(400).json({ text: 'Restaurante inválido ou cardápio não encontrado.' });
        }
    
        // Verificar se newCategory está definido
        if (!newCategory) {
            return res.status(400).json({ text: 'Nova categoria não especificada.' });
        }
    
        // Adicionar uma nova categoria ao cardápio
        restaurante.cardapio.set(newCategory, []);
    
        // Salvar as alterações no banco de dados
        await restaurante.save();
    
        // Retorna uma resposta de sucesso
        res.json({ text: 'Categoria adicionada com sucesso!' });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ text: 'Erro ao atualizar o cardápio no banco de dados', err });
    }
}