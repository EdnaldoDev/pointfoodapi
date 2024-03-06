import mongoose from 'mongoose'
export const  connectDB= (mongodbKey)=>{
   try{
    mongoose.connect(mongodbKey,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('MongoDB Connected...')
    })
   }catch(err){
    console.log(err)
   }
}  
