"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env = require('dotenv');
env.config({});
const db_1 = require("./db");
const server_1 = __importDefault(require("./server"));
const PORT = process.env.PORT || 4001;
server_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    // await sequelize.sync({ force: true })
    yield db_1.sequelize.sync({ force: false, alter: true, });
    console.log("server has started on port ", PORT, ' 🚀');
}));
