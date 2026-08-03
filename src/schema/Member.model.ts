import mongoose, { Schema } from 'mongoose';
import { MemberExperience, MemberSpecialty, MemberStatus, MemberType } from '../libs/enums/member.enum';

// Schema first & Code first

const memberSchema = new Schema({
    memberType: {
        type: String,
        enum: MemberType,
        default: MemberType.USER
    },

    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE
    },

    memberNick: {
        type: String,
        index: { unique: true, sparse: true },
        required: true
    },

    memberPhone: {
        type: String,
        index: { unique: true, sparse: true },
        required: true
    },

    memberPassword: {
        type: String,
        select: false,
        required: true
    },

    memberAddress: {
        type: String,
    },

    memberDesc: {
        type: String,
    },

    memberImage: {
        type: String,
    },

    memberPoints: {
        type: Number,
        default: 0
    },

    memberSpecialty: {
        type: String,
        enum: MemberSpecialty,
        default: MemberSpecialty.CLASSIC,
    },
    memberExperience: {
        type: String,
        enum: MemberExperience,
        default: MemberExperience.BEGINNER,
    }
},
    { timestamps: true } // updatedAt,  createdAt
);

export default mongoose.model('Member', memberSchema)