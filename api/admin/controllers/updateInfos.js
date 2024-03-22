import {Restaurante} from '../../schemas/db.js'

export async function updateInfos(req, res){
    const {prop, value}=req.body
    const restaurante= res.user

    try{
        
        if (prop.length === 1) {
            if (restaurante) {
                restaurante[prop[0]] = value;
                restaurante.save();
            } else {
               res.json({text:'Erro: restaurante não está definido.'});
            }
        }
        
        if (prop.length > 1) {
            if (restaurante && restaurante[prop[0]]) {
                restaurante[prop[0]][prop[1]] = value;
                restaurante.save();
            } else {
                res.json({text:'Erro: restaurante ou sua propriedade não está definido.'});
            }
        }
        const updatedRestaurante = await Restaurante.findById(req.body._id)
        res.status(200).json({ success: true, message: 'Restaurante atualizado com sucesso', updatedRestaurante })
    }catch(err){
        console.log('uodateinfo.js ' ,err)
        res.status(400).json({ success: false, erro:err, message: 'Não foi possivel atualizar o restaurante, tente novamnete mais tarde' })
    }
}