import mongoose from 'mongoose'

import {Restaurante} from '../../schemas/db.js'

export const deleteCategory=async (req, res)=>{
    const { category} = req.body;

    
    const restaurante = res.user;

    try {
        // Verificar se restaurante é um documento válido do modelo Restaurante
        if (!restaurante || !restaurante.cardapio) {
            return res.status(400).json({ text: 'Restaurante inválido ou cardápio não encontrado.' });
        }
    
        // Verificar se category está definido
        if (!category) {
            return res.status(400).json({ text: 'categoria não especificada.' });
        }
    
        // verifica se existe a categoria no cardapio
        if(!restaurante.cardapio.has(category)){
            return res.status(400).json({ text: 'A categoria especificada não existe no cardápio.' });
        }
        restaurante.cardapio.delete(category);
    
        // Salvar as alterações no banco de dados
        await restaurante.save();
    
        // Retorna uma resposta de sucesso
        res.json({ text: 'Categoria excluida  com sucesso!' });
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ text: 'Erro ao atualizar o cardápio no banco de dados', err });
    }
}