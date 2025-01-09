import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

const createContactToDB = async (payload: IContact): Promise<IContact> => {
    const contact = await Contact.create(payload);

    if (!contact) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Contact");
    }

    return contact;
}

const getContactsFromDB = async (query: Record<string, any>): Promise<{contacts:IContact[], meta: {page: number, total: number}}> => {

    const { page, limit } = query;

    const pages = parseInt(page as string) || 1;
    const size = parseInt(limit as string) || 10;
    const skip = (pages - 1) * size;

    const contacts = await Contact.find()
        .skip(skip)
        .limit(size);

    const count = await Contact.countDocuments();


    if (!contacts.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create Contact");
    }

    return {
        contacts,
        meta : {
            page: pages,
            total: count
        }
    };
}

export const ContactService = {
    createContactToDB,
    getContactsFromDB
}
