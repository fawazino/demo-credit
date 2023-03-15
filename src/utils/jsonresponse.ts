import { Response } from 'express';
const logger = require ("../utils/logger");

export const s = (res: Response, statusCode: number = 200, status: boolean, data: any, message: string) => {
    return res.status(statusCode).send({
        status,
        data,
        message
    })
}

export class F {
    static logError(error: any) {
        logger.error(error);
    }
    static notfound(res: Response, data?: any): Response {
        this.logError(data);
        logger.error(data);
        return res.status(404).send({
            status: false,
            error: data ? data : "not found",
        });
    }
    static serverError(res: Response, data?: any): Response {
        this.logError(data);
        logger.error(data);
        return res.status(500).send({
            status: false,
            error: data ? data : "Opps Error Ocurred 😢",
        });
    }
    static unprocessedEntity(res: Response, data?: any): Response {
        this.logError(data);
        logger.error(data);
        return res.status(422).send({
            status: false,
            error: data ? data : "unprocessed entity",
        });
    }
    static clientError(res: Response, data: any, code?: number): Response {
        this.logError(data);
        logger.error(data);
        return res.status(code || 400).send({
            status: false,
            error: data ? data : "Bad Request",
        });
    }
    static unauthenticated(res: Response, data?: any): Response {
        this.logError(data);
        logger.error(data);
        return res.status(401).send({
            status: false,
            error: data ? data : "user is unauthenticated",
        });
    }
}

export type InsTypes = {
    success: boolean
    message?: any
    data?: any
    error?: any
    statusCode?: number
}

export class InS {
    static failed(error?: any, statusCode?: number): InsTypes {
        logger.error(error);
        return {
            success: false,
            message: error,
            statusCode
        }
    }

    static success(data?: any, message?: any): InsTypes {
        return {
            success: true,
            data,
            message
        }
    }
}
