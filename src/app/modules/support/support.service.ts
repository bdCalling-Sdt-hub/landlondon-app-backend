import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ISupport } from "./support.interface";
import { Support } from "./support.model";

const makeSupportToDB = async (payload: ISupport): Promise<ISupport> => {
    const support = await Support.create(payload);
    if (!support) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to created support");
    }

    return support;
}

const getSupportFromDB = async (query: Record<string, any>): Promise<{supports : ISupport[], meta : {page: number, limit: number, total: number}}> => {
    const { page, limit } = query;

    const pages = parseInt(page as string) || 1;
    const size = parseInt(limit as string) || 10;
    const skip = (pages - 1) * size;

    const supports = await Support.find()
        .populate("brand", "name profile email")
        .skip(skip)
        .limit(size)
        .lean();

    const total = await Support.countDocuments();

    const data = {
        supports,
        meta : {
            page: pages,
            limit: size,
            total
        }
    } as {supports : ISupport[], meta : {page: number, limit: number, total: number}}

    if (!supports.length) {
        return {supports, meta : {page: page, limit: size, total}}
    }

    return data;
}

export const SupportService = {
    makeSupportToDB,
    getSupportFromDB
}   