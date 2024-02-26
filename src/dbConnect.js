import mongoose from 'mongoose'

export const  connectDB= ()=>{
   try{
    mongoose.connect('mongodb+srv://ednaldoend007:End007@cluster0.oz0yqh5.mongodb.net/estabelecimentos?retryWrites=true&w=majority')
    .then(()=>{
        console.log('MongoDB Connected...')
    })
   }catch(err){
    console.log(err)
   }
}  