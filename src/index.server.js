import express  from 'express'
import dotenv from 'dotenv'
const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//routes
import userRoutes from './routes/user.js';

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

app.use(bodyParser());
app.use('/api',userRoutes); 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}) 
 



