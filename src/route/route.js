import express from 'express';
import { ClientController } from '../controller/ClientController.js';

export const rotas = express.Router();

const {mostrar,criar,deletar,buscarUnico,update} = new ClientController();


rotas.get("/cliente", mostrar);
rotas.post("/cadastro", criar);





