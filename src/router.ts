import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";

/** Member */
router.get("/member/barber", memberController.getBarber);
router.post("/member/signup", memberController.signup);
router.post("/member/login", memberController.login);
router.post("/member/logout",
    memberController.veryfyAuth,
    memberController.logout);
// credential checking
router.get("/member/detail",
    memberController.veryfyAuth,
    memberController.getMemberDetail);
router.post("/member/update",
    memberController.veryfyAuth,
    uploader("members").single("memberImage"), // uploads members filega memberImage nomi bilan saqlashini korsatdik
    memberController.updateMember
);
router.get("/member/top-users", memberController.getTopUsers);


/** Services */


/** Bookings */

export default router; 
