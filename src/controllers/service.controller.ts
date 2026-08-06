import express, { Request, Response } from "express";
import Errors from "../libs/Errors";
import { T } from "../libs/types/common";
import CuttingService from "../models/Cutting.service";

const cuttingService = new CuttingService();

const serviceController: T = {};

serviceController.getAllServices = async (req: Request, res: Response) => {
    try {
        console.log('getAllServices')
        res.render("services")
    }
    catch (err) {
        console.log("Error, getAllServices:", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

serviceController.createNewService = async (req: Request, res: Response) => {
    try {
        console.log('createNewService')
    }
    catch (err) {
        console.log("Error, createNewService:", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

serviceController.updateChosenService = async (req: Request, res: Response) => {
    try {
        console.log('updateChosenService')
    }
    catch (err) {
        console.log("Error, updateChosenService:", err)
        if (err instanceof Errors) res.status(err.code).json(err)
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default serviceController