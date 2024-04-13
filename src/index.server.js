import express  from 'express'
import dotenv from 'dotenv'
const app = express();
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import path from 'path';
import cors from 'cors';

//routes
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin/auth.js';
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js"
import initialDataRoutes from './routes/admin/initialData.js' 
import pageRoutes from "./routes/admin/page.js";
import addressRoutes from "./routes/address.js";
import orderRoutes from "./routes/order.js";
import adminOrderRoute from "./routes/admin/order.routes.js";
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
    console.log("Database connectedd");
  }); 

app.use(cors());
app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'uploads')));
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use("/api",cartRoutes);
app.use('/api',initialDataRoutes);
app.use("/api",pageRoutes);
app.use("/api",addressRoutes);
app.use("/api",orderRoutes);
app.use("/api", adminOrderRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
}) 
 



