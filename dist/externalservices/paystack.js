"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.Paystack = void 0;
const axios_1 = __importDefault(require("axios"));
const typedi_1 = require("typedi");
const jsonresponse_1 = require("../utils/jsonresponse");
const logger = require("../utils/logger");
const node_fetch_1 = __importDefault(require("node-fetch"));
let Paystack = class Paystack {
    constructor() {
        this.paystackUrl = process.env.PAYSTACK_URL;
        this.secretKey = process.env.PAYSTACK_KEY;
    }
    initializeTransaction(email, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !amount) {
                return jsonresponse_1.InS.failed('missing required fields', 400);
            }
            if (amount < 1) {
                return jsonresponse_1.InS.failed('amount cannot be less than 1', 400);
            }
            try {
                const url = `${this.paystackUrl}/transaction/initialize`;
                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.secretKey}`
                    },
                    body: JSON.stringify({ email, amount })
                };
                const response = yield (0, node_fetch_1.default)(url, options);
                const json = yield response.json();
                if (response.status === 200) {
                    logger.info("Success");
                    return jsonresponse_1.InS.success(Object.assign({}, json), "Transaction successful");
                }
                logger.error(json);
                return jsonresponse_1.InS.failed('Unable to charge card', 400);
            }
            catch (error) {
                logger.error(error);
                return jsonresponse_1.InS.failed('Debit Failed', 400);
            }
        });
    }
    verifyTransaction(reference) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data } = yield axios_1.default.get(`${this.paystackUrl}/transaction/verify/${reference}`, {
                    headers: {
                        Authorization: `Bearer ${this.secretKey}`
                    }
                });
                if (data.status) {
                    logger.info("Success");
                    return jsonresponse_1.InS.success(Object.assign({}, data.data), 'payment verification successful');
                }
                return jsonresponse_1.InS.failed('failed payment verification', 400);
            }
            catch (error) {
                console.log(error);
                logger.error(error);
                return jsonresponse_1.InS.failed('failed payment verification', 400);
            }
        });
    }
    debit(info) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!info.authorization_code || !info.email || !info.amount) {
                return jsonresponse_1.InS.failed('missing required fields', 400);
            }
            if (info.amount < 1) {
                return jsonresponse_1.InS.failed('amount must be less than 1', 400);
            }
            try {
                const url = `${this.paystackUrl}/transaction/charge_authorization`;
                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.secretKey}`
                    },
                    body: JSON.stringify(Object.assign(Object.assign({}, info), { amount: String(info.amount) }))
                };
                const response = yield (0, node_fetch_1.default)(url, options);
                const json = yield response.json();
                if (response.status === 200) {
                    logger.info("Success");
                    return jsonresponse_1.InS.success(Object.assign({}, json), "Payment verification successful");
                }
                logger.error(json);
                return jsonresponse_1.InS.failed('Unable to charge card', 400);
            }
            catch (error) {
                logger.error(error);
                return jsonresponse_1.InS.failed('Debit Failed', 400);
            }
        });
    }
};
Paystack = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], Paystack);
exports.Paystack = Paystack;
