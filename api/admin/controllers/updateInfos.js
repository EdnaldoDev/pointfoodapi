import {Restaurante} from '../../schemas/db.js'

export async function updateInfos(req, res){
    const restaurante= res.user

    try{
        const filter = { _id: req.body._id };
        const updateOperation = { $set: req.body.updatedFields };
        const updatedData = await Restaurante.updateMany(filter, req.body.updatedFields)

        const updatedRestaurante = await Restaurante.findById(req.body._id)
       
        res.status(200).json({ success: true, message: 'Restaurante atualizado com sucesso', updatedRestaurante })
    }catch(err){
        console.log(err)
        res.status(400).json({ success: false, message: 'Não foi possivel atualizar o restaurante, tente novamnete mais tarde' })
    }
}