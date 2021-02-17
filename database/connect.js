import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DataBase Connected..!")
}).catch((e) => {
    console.log('Error:--' + e)
})

export default mongoose 