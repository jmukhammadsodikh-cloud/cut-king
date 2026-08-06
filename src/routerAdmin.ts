import express from "express";
const routerAdmin = express.Router();
import barberController from "./controllers/barber.controller";
import makeUploader from "./libs/utils/uploader";

/** Barber admin */

routerAdmin.get('/', barberController.goHome);
routerAdmin.get('/dashboard', barberController.getDashboard);
routerAdmin.get('/service/all', barberController.getServices);
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
        barberController.veryfyRestaurant, // MD oraliq mantiq
        barberController.getAllServices
    );
routerAdmin
    .post('/service/create',
        barberController.veryfyRestaurant,
        makeUploader("services").array("serviceImages", 5),
        barberController.createNewService,
    );
routerAdmin.post('/services/:id',
    barberController.veryfyRestaurant,
    barberController.updateChosenService,
);

/** User */
export default routerAdmin;