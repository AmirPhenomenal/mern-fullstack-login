import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';

import userRoutes from "./routes/users.js";


dotenv.config();
const app = express();
//Setting Limite For Datas Coming To Backend
app.use(bodyParser.json({ limit: "5mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));

app.use(cors());
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`))
    )
    .catch((error) => console.log(error.message));
