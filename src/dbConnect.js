import mongoose from 'mongoose'
export const  connectDB= (mongodbKey)=>{
   try{
    mongoose.connect(mongodbKey)
    .then(()=>{
        console.log('MongoDB Connected...')
    })
   }catch(err){
    console.log(err)
   }
}  