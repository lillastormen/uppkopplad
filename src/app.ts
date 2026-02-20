import express from "express";
import userRoutes  from './routes/userRoutes.ts'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Users Routes
app.use('/users', userRoutes)

export default app;
