import mongoose from "mongoose";
import {Restaurante} from '../../schemas/db.js'

export async function signUp(restaurantData){
    try{
        const newRestaurante = await Restaurante.create(restaurantData)

        const savedRestaurante= await newRestaurante.save()

        console.log('Restaurante cadastrado com sucesso:', savedRestaurante);
        return {text:'Cadastrado com sucesso', savedRestaurante};
    }catch(err){
        console.error("Erro no cadastro do restaurante", err);
    }
}

export async function login(email, password){

    const  restaurant = await Restaurante.findById(email)
    if(!restaurant) throw new Error ('Usuário não encontrado');
    
    console.log(restaurant.senha, password)

    if(restaurant.senha !== password){
       return  {msg:"Senha incorreta"};  
    }

    console.log(restaurant)

    return restaurant
}