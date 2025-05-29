import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const CONNECTION_STRING = process.env.CONNECTION_STRING as string;

export const connectDb = async () => {
    try{
        console.log('Connecting ....')
        const connect = await mongoose.connect(CONNECTION_STRING);
        console.log('Connected db.')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
