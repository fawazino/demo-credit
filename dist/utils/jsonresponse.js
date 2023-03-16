"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InS = exports.F = exports.s = void 0;
const logger = require("../utils/logger");
const s = (res, statusCode = 200, status, data, message) => {
    return res.status(statusCode).send({
        status,
        data,
        message
    });
};
exports.s = s;
class F {
    static logError(error) {
        logger.error(error);
    }
    static notfound(res, data) {
        this.logError(data);
        logger.error(data);
        return res.status(404).send({
            status: false,
            error: data ? data : "not found",
        });
    }
    static serverError(res, data) {
        this.logError(data);
        logger.error(data);
        return res.status(500).send({
            status: false,
            error: data ? data : "Opps Error Ocurred 😢",
        });
    }
    static unprocessedEntity(res, data) {
        this.logError(data);
        logger.error(data);
        return res.status(422).send({
            status: false,
            error: data ? data : "unprocessed entity",
        });
    }
    static clientError(res, data, code) {
        this.logError(data);
        logger.error(data);
        return res.status(code || 400).send({
            status: false,
            error: data ? data : "Bad Request",
        });
    }
    static unauthenticated(res, data) {
        this.logError(data);
        logger.error(data);
        return res.status(401).send({
            status: false,
            error: data ? data : "user is unauthenticated",
        });
    }
}
exports.F = F;
class InS {
    static failed(error, statusCode) {
        logger.error(error);
        return {
            success: false,
            message: error,
            statusCode
        };
    }
    static success(data, message) {
        return {
            success: true,
            data,
            message
        };
    }
}
exports.InS = InS;
