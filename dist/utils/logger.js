"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
module.exports = (0, winston_1.createLogger)({
    transports: new winston_1.transports.File({
        filename: 'logs/server.log',
        format: winston_1.format.combine(winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`))
    }),
});
// export class Logger {
//     constructor() {
//     }
// static error(e: any) {
//     console.log(chalk.redBright(e?.message, e?.name, e?.stack));
// }
// static success(e: any) {
//     console.log(chalk.greenBright(e.message, e.name, e.stack));
// }
// static warning(e: any) {
//     console.log(chalk.yellowBright(e.message, e.name, e.stack));
// }
// }
