import express from "express";
const routerAdmin = express.Router();
import barberController from "./controllers/barber.controller";
import makeUploader from "./libs/utils/uploader";
import serviceController from "./controllers/service.controller";

/** Barber admin */

routerAdmin.get('/', barberController.goHome);
routerAdmin.get('/dashboard', barberController.getDashboard);
routerAdmin.get('/user/all', barberController.getUsers);
routerAdmin.get('/master/all', barberController.getMasters);

routerAdmin
    .get('/login', barberController.getLogin)
    .post('/login', barberController.processLogin);

routerAdmin
    .get('/signup', barberController.getSignup)
    .post('/signup', makeUploader("members").single("memberImage"),
        barberController.processSignup)

routerAdmin
    .get('/logout', barberController.logout)
    .get('/check-me', barberController.checkAuthSession)



/** Services */
routerAdmin
    .get('/services/all',
        barberController.veryfyBarbershop, // MD oraliq mantiq
        serviceController.getAllServices
    );
routerAdmin
    .post('/services/create',
        barberController.veryfyBarbershop,
        makeUploader("cutting-services").array("servicesImages", 5),
        serviceController.createNewService,
    );
routerAdmin.post('/services/:id',
    barberController.veryfyBarbershop,
    serviceController.updateChosenService,
);

/** User */
export default routerAdmin;