import express from 'express';
import cors from "cors";
import config  from './config';
import mongoose from 'mongoose';
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';




const app=express()
app.use(cors());
app.use(express.json())
app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);


app.listen( config.port,() => {
  console.log(`Server is running on port ${config.port}`);
});
async function server(){
 try{
  console.log(config)
    await mongoose.connect(config.database_url as string)
    console.log("mongodb is connected successfully");
 }catch(e){
   console.error('Error starting server:', e);
 }
}
server();
