import { Model, Types } from "mongoose";

export type IBusiness = {
    brand: Types.ObjectId;
    name: string;
    website: string;
    image: string;
    facebook:string;
    linkedin:string;
    twitter:string;
    instagram:string;
}

export type BusinessModel = Model<IBusiness, Record<string, unknown>>;