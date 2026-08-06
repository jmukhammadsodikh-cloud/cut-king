import express, { Request, Response } from "express";
import { T } from "../libs/types/common"
import MemberService from "../models/Member.service";
import { AdminRequest, LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
const barberController: T = {};
const memberService = new MemberService();


barberController.goHome = (req: Request, res: Response) => {
    try {

        res.render("home");
    }
    catch (err) {
        console.log("Error, goHome:", err)
    }
};

barberController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('getLogin')
        res.render("login");
    }
    catch (err) {
        console.log("Error, getLogin:", err)
    }
};

barberController.getSignup = (req: Request, res: Response) => {
    try {
        console.log('getSignup')
        res.render("signup");
    }
    catch (err) {
        console.log("Error, getSignup:", err)
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
        console.log("Error, processLogin:", err)
        res.send(err);
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
        res.send(err)
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

barberController.getServices = (req: Request, res: Response) => {
    try {
        res.render("services", {
            member: { memberNick: "CutKing" },
            services: []
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