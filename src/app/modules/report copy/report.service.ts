import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IReport } from "./report.interface";
import { Report } from "./report.model";

const makeReportToDB = async (payload: IReport): Promise<IReport> => {
    const report = await Report.create(payload);
    if (!report) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to make report")
    }

    return report;
}

const getReportListFromDB = async (query: Record<string, any>): Promise<{reports: IReport[], meta: {page: number, total: number, limit: number}}> => {

    const { page, limit } = query;

    const pages = parseInt(page as string) || 1;
    const size = parseInt(limit as string) || 10;
    const skip = (pages - 1) * size;

    const reports = await Report.find()
        .populate("influencer", "name email profile")
        .skip(skip)
        .limit(limit);


    if (!reports.length) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "No data found");
    }
    
    const count = await Report.countDocuments();

    const data ={
        reports,
        meta: {
            page: pages,
            total: count,
            limit: size
        }
    } as {reports: IReport[], meta: {page: number, total: number, limit: number}}


    return data;
}

export const ReportService = {
    makeReportToDB,
    getReportListFromDB
}