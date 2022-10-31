import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import * as productcrud from "./productcrud";
import process from "process";

dotenv.config();
if (!process.env.PORT) 
{console.log(`Error to get ports`);
process.exit(1);
}
const PORT: number = parseInt(process.env.PORT as string, 10);

const uri: string = process.env.database!;  //can use any of this process.env.database || ''; or this //const BOT_PREFIX: string = `${process.env.PREFIX}`;
mongoose.connect(uri, (err: any) => {if (err) {console.log(err.message);
} else {
    console.log(`Connected to MONGO`);
}
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => res.send('Welcome to national team football association page'));

app.get("/products", productcrud.getProductList);
app.post("/products",productcrud.createProduct);
app.post("/updateproduct",productcrud.updateroduct);
app.post("/deleteproduct",productcrud.deleteproduct);