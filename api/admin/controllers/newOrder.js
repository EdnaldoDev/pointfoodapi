export async function newOrder(req, res){

    const restaurant= res.user

    if(!restaurant){
        res.status(401).send({error:'Não foi possivel encontrar o o restaurante'})
    }

    // //(req.body.customer)
    let customer
    if(restaurant.clientes.length>0){
        customer= restaurant.clientes.find(cliente=>cliente?.phone === req.body.data.customer.phone)
    }


    if(!customer){
     
        const newCustomer= await restaurant.clientes.push({
            name:req.body.data.customer.name,
            phone:req.body.data.customer.phone
        })

    
        const restauranteAtualizado = await restaurant.save();
    
        const novoClienteId = restauranteAtualizado.clientes[restauranteAtualizado.clientes.length - 1]._id
        await addNewOrder(novoClienteId, restauranteAtualizado, req.body.data, res)
    }else{
        await addNewOrder(customer._id, restaurant, req.body.data, res)
    }
}

async function addNewOrder(customerId, restaurant, data, res){
    //(customerId, restaurant, data)
    try{
        
        const pushOrder = await restaurant.pedidos.push(data)

        const updatdRestaurante= await restaurant.save()

        res.status(201).json({
            orderId:updatdRestaurante.pedidos[updatdRestaurante.pedidos.length - 1]._id,
            text:'Otimo seu pedido foi confimado e ja esta em produção'
        })
    }catch(err){
        //(err)
        res.status(400).json({text:'Houver um erro ao anotar seu pedidos tente novamente'})
    }
}