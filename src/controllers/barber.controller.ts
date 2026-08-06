import express, { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common"
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
import Errors, { Message } from "../libs/Errors";
const barberController: T = {};
const memberService = new MemberService();


barberController.goHome = (req: Request, res: Response) => {
    try {

        res.render("home");
    }
    catch (err) {
        console.log("Error, goHome:", err)
        res.redirect("/admin");
    }
};

barberController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('getLogin')
        res.render("login");
    }
    catch (err) {
        console.log("Error, getLogin:", err)
        res.redirect("/admin");
    }
};

barberController.getSignup = (req: Request, res: Response) => {
    try {
        console.log('getSignup')
        res.render("signup");
    }
    catch (err) {
        console.log("Error, getSignup:", err)
        res.redirect("/admin");
    }
};


barberController.processSignup = async (req: AdminRequest, res: Response) => {
    try {
        console.log('processSignup')

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.BARBER;

        const result = await memberService.processSignup(newMember);

        // AUTH
        req.session.member = result;
        req.session.save(function () {
            res.send(result);
        });

    }
    catch (err) {
        console.log("Error, processSignup:", err)
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script>alert ("${message}"); window.location.replace('admin/signup') </script>`);

    }
};

barberController.processLogin = async (req: AdminRequest, res: Response) => {
    try {
        console.log('processLogin')
        console.log("body:", req.body)
        const input: LoginInput = req.body;

        const result = await memberService.processLogin(input);

        // AUTH
        req.session.member = result;
        req.session.save(function () {
            res.send(result);
        });

    }
    catch (err) {
        console.log("Error, processLogin:", err);
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script>alert ("${message}"); window.location.replace('admin/login') </script>`);
    }
};


barberController.logout = async (req: AdminRequest, res: Response) => {
    try {
        console.log('logout')
        req.session.destroy(function () {
            res.redirect("/admin")
        });
    }
    catch (err) {
        console.log("Error, logout:", err)
        res.redirect("/admin")
    }
};


barberController.checkAuthSession = async (req: AdminRequest, res: Response) => {
    try {
        console.log('checkAuthSession')
        if (req.session?.member)
            res.send(`<script>alert("${req.session.member.memberNick}")</script>`)
        else res.send(`<script>alert("${Message.NOT_AUTHENTICATED}")</script>`);

    }
    catch (err) {
        console.log("Error, checkAuthSession:", err)
        res.send(err);
    }
};


barberController.veryfyRestaurant = (
    req: AdminRequest,
    res: Response,
    next: NextFunction
) => {
    // req.session icidan member check qilamiz typeRestaurant bolsh shart
    if (req.session?.member?.memberType === MemberType.BARBER) {
        req.member = req.session.member; // type checking
        next();
    } else {
        const message = Message.NOT_AUTHENTICATED;
        res.send(
            `<script>alert("${message}"); window.location.replace('/admin/login);</script>`
        );
    }
};

// hardcoding

barberController.getDashboard = (req: Request, res: Response) => {
    try {
        res.render("dashboard", {
            member: { memberNick: "CutKing" },  // hardcode
            services: [],
            users: [],
            masters: []
        });
    }
    catch (err) { console.log(err) }
};

barberController.getUsers = (req: Request, res: Response) => {
    try {
        res.render("users", {
            member: { memberNick: "CutKing" },
            users: []
        });
    }
    catch (err) { console.log(err) }
};

barberController.getMasters = (req: Request, res: Response) => {
    try {
        res.render("masters", {
            member: { memberNick: "CutKing" },
            masters: []
        });
    }
    catch (err) { console.log(err) }
};


export default barberController;