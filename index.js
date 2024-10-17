import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { rotas } from './src/route/route.js';
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/erp",rotas);
const PORTA = process.env.PORTA || 3000;

app.listen(PORTA, () => {
    try{
        console.log('Servidor está rodando na porta 3000!');
    }
    catch(error) {
        console.log(error + 'Infelizmente ao rodar o servidor');
    }    
})