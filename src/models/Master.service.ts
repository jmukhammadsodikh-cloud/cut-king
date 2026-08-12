import * as bcrypt from "bcryptjs";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import MemberModel from "../schema/Member.model";
import { MemberType } from "../libs/enums/member.enum";
import { shapeIntoMongooseObjectId } from "../libs/config";

class MasterService {
    private readonly memberModel;

    constructor() {
        this.memberModel = MemberModel;
    }

    /** BSSR============ */

    public async getAllMasters(): Promise<Member[]> {
        const result = await this.memberModel
            .find({ memberType: MemberType.MASTER })
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

        return result as unknown as Member[];
    }

    public async createNewMaster(input: MemberInput): Promise<Member> {
        input.memberType = MemberType.MASTER; // xavfsizlik: forma orqali memberType ozgartirib bolmaydi

        const salt = await bcrypt.genSalt();
        input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

        try {
            const result = await this.memberModel.create(input);
            result.memberPassword = "";

            return result.toJSON() as unknown as Member;

        } catch (err) {
            console.error("Error, model:createNewMaster:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async updateChosenMaster(
        id: string,
        input: MemberUpdateInput
    ): Promise<Member> {
        id = shapeIntoMongooseObjectId(id); // string => ObjectId

        const result = await this.memberModel
            .findOneAndUpdate(
                { _id: id, memberType: MemberType.MASTER }, // faqat MASTER hujjatini yangilaydi
                input,
                { new: true }
            )
            .exec();
        if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATE_FAILED);

        return result.toJSON() as unknown as Member;
    }
}

export default MasterService;