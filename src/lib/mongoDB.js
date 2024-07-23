import mongoose from "mongoose";

export async function Conexion(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/naturvida")
        console.log("conexion exitosa")  
    } catch (error) {
        console.log(error)
    }
   

}