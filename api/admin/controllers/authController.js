import mongoose from "mongoose";
import {Restaurante} from '../../schemas/db.js'

export async function signUp(restaurantData){
    try{
        const existRestaurant= await Restaurante.findById(restaurantData.email)
        if(existRestaurant){
            return({status:500,text:'Email ja cadastrado na plataforma, faça login ou entre com outro email'})
        }

        const newRestaurante = await Restaurante.create({
            ...restaurantData, 
            _id:restaurantData.
            email, 
            storeToken:`${restaurantData.email}/${restaurantData.nome}`,
        })

        const savedRestaurante= await newRestaurante.save()

        // //('Restaurante cadastrado com sucesso:', savedRestaurante);
        return {text:'Cadastrado com sucesso', savedRestaurante, status:200};
    }catch(err){
        // console.error("Erro no cadastro do restaurante", err);
        return {text:'Ero ao cadastrar restaurante', err};
    }
}

export async function login(email, password){

    const  restaurant = await Restaurante.findById(email)
    
    if(!restaurant) throw new Error ('Usuário não encontrado');
    
    if(restaurant.senha !== password) throw new Error ('Senha incorreta!') ;  
    return restaurant

}