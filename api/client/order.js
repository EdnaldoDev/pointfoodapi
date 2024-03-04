import { Restaurante } from "../schemas/db.js"

export async function newOrder(req, res){

    const restaurant= res.user
    // console.log(req.body)
    if(!restaurant){
        res.status(401).send({error:'Não foi possivel encontrar o o restaurante'})
    }

    // console.log(req.body.customer)
    let customer
    if(restaurant.clientes.length>0){
        customer= restaurant.clientes.find(cliente=>cliente.phone === req.body.customer.phone)
    }

    if(!customer){
        const newCustomer= await restaurant.clientes.push(req.body.customer)

    
        const restauranteAtualizado = await restaurant.save();
    
        const novoClienteId = restauranteAtualizado.clientes[restauranteAtualizado.clientes.length - 1]._id
        await addNewOrder(novoClienteId, restauranteAtualizado, req.body, res)
    }else{
        await addNewOrder(customer._id, restaurant, req.body, res)
    }
}

async function addNewOrder(customerId, restaurant, data, res){
    try{
        
        const pushOrder = await restaurant.pedidos.push({
            deliveryMethod:data.deliveryMethod,
            customerId,
            total:data.total,
            items:data.items
        })

        
        const updatdRestaurante= await restaurant.save()

        res.status(201).json({
            orderId:updatdRestaurante.pedidos[updatdRestaurante.pedidos.length - 1]._id,
            text:'Otimo seu pedido foi confimado e ja esta em produção'
        })
    }catch(err){
        res.status(400).json({text:'Houver um erro ao anotar seu pedidos tente novamente'})
    }
}