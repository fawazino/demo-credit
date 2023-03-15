import chalk from "chalk";
import { createLogger, format, transports } from 'winston'
 
module.exports = createLogger({
    transports:
        new transports.File({
        filename: 'logs/server.log',
        format:format.combine(
            format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            format.align(),
            format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        )}),
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