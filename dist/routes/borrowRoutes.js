"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const borrowController_1 = require("../controllers/borrowController");
const borrowRoutes = express_1.default.Router();
borrowRoutes.post('/borrow', borrowController_1.borrowBook);
borrowRoutes.get('/borrow', borrowController_1.getBorrowedSummary);
exports.default = borrowRoutes;
