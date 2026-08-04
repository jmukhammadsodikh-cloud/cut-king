import express from "express";
const router = express.Router();
import memberController from "./controllers/member.controller";

/** SPA */
router.post('/member/signup', memberController.signup)
router.post('/member/login', memberController.login);

export default router;