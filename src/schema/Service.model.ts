import mongoose, { Schema } from "mongoose";
import { ServiceCollection, ServiceStatus } from "../libs/enums/service.enum";

const serviceSchema = new Schema(
    {
        serviceStatus: {
            type: String,
            enum: ServiceStatus,
            default: ServiceStatus.PAUSED,
        },

        serviceCollection: {
            type: String,
            enum: ServiceCollection,
            required: true,
        },

        serviceName: {
            type: String,
            required: true,
        },

        servicePrice: {
            type: Number,
            required: true,
        },

        serviceDuration: {
            type: Number,   // minutlarda: 30, 45, 60, 90
            required: true,
        },

        serviceDesc: {
            type: String,
            required: true,
        },

        productImages: {
            type: [String],
            default: []
        },

        productViews: {
            type: Number,
            default: 0,

        },

    },
    { timestamps: true }
);

serviceSchema.index(
    { productName: 1, productSize: 1, productVolume: 1 },
    { unique: true })

export default mongoose.model("Service", serviceSchema);