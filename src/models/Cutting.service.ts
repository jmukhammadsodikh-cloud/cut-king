import Errors, { HttpCode, Message } from "../libs/Errors";
import { ServceInput, Service } from "../libs/types/service";
import ServiceModel from "../schema/Service.model";

class CuttingService {
    private readonly serviceModel;


    constructor() {
        this.serviceModel = ServiceModel;

    }
    /** SPA=========== */


    /** BSSR============ */

    public async createNewService(input: ServceInput): Promise<Service> {
        try {
            const result = await this.serviceModel.create(input);

            return result.toJSON() as unknown as Service;

        } catch (err) {
            console.error("Error, model:createNewService:", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

}


export default CuttingService