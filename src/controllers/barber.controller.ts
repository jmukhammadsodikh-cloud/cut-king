import express, { Request, Response } from "express";
import { T } from "../libs/types/common"
import MemberService from "../models/Member.service";
import { LoginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/enums/member.enum";
const barberController: T = {};
const memberService = new MemberService();


barberController.goHome = (req: Request, res: Response) => {
    try {
        console.log('goHome')
        res.send('Home Page');
        // send | json | redirect | end | render
    }
    catch (err) {
        console.log("Error, goHome:", err)
    }
};

barberController.getLogin = (req: Request, res: Response) => {
    try {
        console.log('getLogin')
        res.send('Login Page');
    }
    catch (err) {
        console.log("Error, getLogin:", err)
    }
};

barberController.getSignup = (req: Request, res: Response) => {
    try {
        console.log('getSignup')
        res.send('Signup Page');
    }
    catch (err) {
        console.log("Error, getSignup:", err)
    }
};

barberController.processLogin = async (req: Request, res: Response) => {
    try {
        console.log('processLogin')
        console.log("body:", req.body)
        const input: LoginInput = req.body;

        const result = await memberService.processLogin(input);
        // TODO: SESSIONS AUTHENTICATION


        res.send(result)

    }
    catch (err) {
        console.log("Error, processLogin:", err)
        res.send(err);
    }
};

barberController.processSignup = async (req: Request, res: Response) => {
    try {
        console.log('processSignup')

        const newMember: MemberInput = req.body;
        newMember.memberType = MemberType.BARBER;

        const result = await memberService.processSignup(newMember);

        res.send(result);
    }
    catch (err) {
        console.log("Error, processSignup:", err)
        res.send(err)
    }
};
export default barberController;