import express from "express";
const routerAdmin = express.Router();
import barberController from "./controllers/barber.controller";

/** Barber admin */

routerAdmin.get('/', barberController.goHome);

routerAdmin
    .get('/login', barberController.getLogin)
    .post('/login', barberController.processLogin);

routerAdmin
    .get('/signup', barberController.getSignup)
    .post('/signup', barberController.processSignup)


/** Services */

/** User */
export default routerAdmin;