import { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import MasterService from "../models/Master.service";
import { AdminRequest, MemberInput } from "../libs/types/member";

const masterService = new MasterService();

const masterController: T = {};

/** BSSR============ */

masterController.getAllMasters = async (req: AdminRequest, res: Response) => {
    try {
        console.log('getAllMasters')
        const data = await masterService.getAllMasters();
        res.render("masters", { masters: data, member: req.session.member });
    }
    catch (err) {
        console.log("Error, getAllMasters:", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

masterController.getMasterCreate = (req: AdminRequest, res: Response) => {
    try {
        res.render("master-create", { member: req.session.member });
    } catch (err) {
        console.log(err);
    }
};

masterController.createNewMaster = async (req: AdminRequest, res: Response) => {
    try {
        console.log('createNewMaster')

        const data: MemberInput = req.body;

        if (req.file) // rasm ixtiyoriy
            data.memberImage = req.file.path.replace(/\\/g, "/");

        await masterService.createNewMaster(data)

        res.send(
            `<script>alert("${"Successfull creation"}"); window.location.replace('/admin/master/all')</script>`);
    }
    catch (err) {
        console.log("Error, createNewMaster:", err)
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script>alert("${message}"); window.location.replace('/admin/master/all')</script>`);
    }
};

masterController.updateChosenMaster = async (req: Request, res: Response) => {
    try {
        console.log('updateChosenMaster')
        const id = req.params.id as string;

        const result = await masterService.updateChosenMaster(id, req.body);

        res.status(HttpCode.OK).json({ data: result })
    }
    catch (err) {
        console.log("Error, updateChosenMaster:", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default masterController