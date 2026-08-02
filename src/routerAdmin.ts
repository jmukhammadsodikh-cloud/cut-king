import express from "express";
const routerAdmin = express.Router();
import barberController from "./controllers/barber.controller";

routerAdmin.get('/', barberController.goHome);

routerAdmin.get('/login', barberController.getLogin);

routerAdmin.get('/signup', barberController.getSignup);

export default routerAdmin;