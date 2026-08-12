import Errors, { HttpCode, Message } from "../libs/Errors";
import { ServceInput, Service, ServiceUpdateInput } from "../libs/types/service";
import ServiceModel from "../schema/Service.model";
import { shapeIntoMongooseObjectId } from "../libs/config";

class CuttingService {
    private readonly serviceModel;


    constructor() {
        this.serviceModel = ServiceModel;

    }
    /** SPA=========== */


    /** BSSR============ */


    public async getAllServices(): Promise<Service[]> { // array ichida bir qator productlarni qaytarishi kerak
        const result = await this.serviceModel.find().exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND)

        return result as unknown as Service[];

    }

    public async createNewService(input: ServceInput): Promise<Service> {
        try {
            const result = await this.serviceModel.create(input);

            return result.toJSON() as unknown as Service;

        } catch (err) {
            console.error("Error, model:createNewService:", err)
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async updateChosenService(
        id: string,
        input: ServiceUpdateInput
    ): Promise<Service> {
        id = shapeIntoMongooseObjectId(id);  // string => ObjectId
        const result = await this.serviceModel.
            findOneAndUpdate({ _id: id }, input, { new: true }) // update bolgan malumotni qaytaradi
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED)

        return result.toJSON() as unknown as Service;

    }

}


export default CuttingService
