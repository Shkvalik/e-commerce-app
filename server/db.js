import mongoose from "mongoose";

const ConnectToDataBase = async () => {
    console.log(process.env.MONGO_URI)
    try {
        mongoose.set('strictQuery', false)
        const conenct = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log(conenct.connection.host);
    } catch (error) {
        console.log(error);
    }
    
}

export default ConnectToDataBase;