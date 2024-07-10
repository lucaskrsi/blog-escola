"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const uuid_1 = require("uuid");
class Uuid {
    constructor(value) {
        if (!(0, uuid_1.validate)(value)) {
            throw new Error(`Value ${value} not is a valid UUID`);
        }
        this._value = value;
    }
    getValue() {
        return this._value;
    }
    static randomGenerator() {
        return new Uuid((0, uuid_1.v4)());
    }
}
exports.Uuid = Uuid;
