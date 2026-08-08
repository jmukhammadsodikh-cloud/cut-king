import express, { Request, Response } from "express";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { T } from "../libs/types/common";
import CuttingService from "../models/Cutting.service";
import { AdminRequest } from "../libs/types/member";
import { ServceInput } from "../libs/types/service";


const cuttingService = new CuttingService();

const serviceController: T = {};

/** SPA=========== */

/** BSSR============ */

serviceController.getAllServices = async (req: Request, res: Response) => {
    try {
        console.log('getAllProducts')
        const data = await cuttingService.getAllServices();
        res.render("services", { services: data }); // ejs ga qiymat yuborish
    }
    catch (err) {
        console.log("Error, getAllServices:", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

serviceController.createNewService = async (req: AdminRequest, res: Response) => {
    try {
        console.log('createNewService')

        if (!req.files?.length) // file 1 dan kop bolishi kerak bolmasa error
            throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED)

        const data: ServceInput = req.body

        data.serviceImages = req.files?.map(ele => {
            return ele.path.replace(/\\/g, "/");
        })

        await cuttingService.createNewService(data)

        res.send(
            `<script>alert ("${"Successfull creation"}"); window.location.replace('admin/services/all') </script>`);
    }
    catch (err) {
        console.log("Error, createNewService:", err)
        const message =
            err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
        res.send(
            `<script>alert ("${message}"); window.location.replace('admin/services/all') </script>`);
    }
};

serviceController.updateChosenService = async (req: Request, res: Response) => {
    try {
        console.log('updateChosenService')
        const id = req.params.id as string;

        const result = await cuttingService.updateChosenService(id, req.body);

        res.status(HttpCode.OK).json({ data: result })
    }
    catch (err) {
        console.log("Error, updateChosenService:", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default serviceController