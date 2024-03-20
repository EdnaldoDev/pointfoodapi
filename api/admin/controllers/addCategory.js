import mongoose from 'mongoose'

import {Restaurante} from '../../schemas/db.js'

export const updateCategory=async (req, res)=>{
    const { category, action} = req.body;

    
    const restaurante = res.user;

    try {
        // Verificar se restaurante é um documento válido do modelo Restaurante
        if (!restaurante ) {
            return res.status(400).json({ text: 'Restaurante inválido ' });
        }
    
        // Verificar se category está definido
        if (!category) {
            return res.status(400).json({ text: 'Nova categoria não especificada.' });
        }
    
        if(action === 'add'){
              // Adicionar uma nova categoria ao cardápio
            restaurante.cardapio.set(category, []);
        
            // Salvar as alterações no banco de dados
            await restaurante.save();
        
            // Retorna uma resposta de sucesso
            res.json({ text: 'Categoria adicionada com sucesso!' });

        }
        else{
            // verifica se existe a categoria no cardapio
            if(!restaurante.cardapio.has(category)){
                return res.status(400).json({ text: 'A categoria especificada não existe no cardápio.' });
            }
            restaurante.cardapio.delete(category);
        
            // Salvar as alterações no banco de dados
            await restaurante.save();
        
            // Retorna uma resposta de sucesso
            res.json({ text: 'Categoria excluida  com sucesso!' });
        }

    
    } catch (err) {
        console.log(err);
        res.status(500).json({ text: 'Erro ao atualizar o cardápio no banco de dados', err });
    }
}