import express  from 'express'
import dotenv from 'dotenv'
const app = express();
import mongoose from 'mongoose';

//routes
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin/auth.js';
import categoryRoutes from "./routes/category.js";

//enviroment variable or you can say constants
dotenv.config();

//mongodb connection admin:root password:admin
//mongodb+srv://root:<password>@cluster0.8ktih.mongodb.net/?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.8ktih.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  }); 

app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}) 
 



