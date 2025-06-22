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
exports.getBorrowedSummary = exports.borrowBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const Borrow_1 = __importDefault(require("../models/Borrow"));
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield Book_1.default.findById(bookId);
        if (!book || book.copies < quantity) {
            return res.status(400).json({ success: false, message: 'Not enough copies', error: 'Insufficient stock' });
        }
        book.copies -= quantity;
        yield book.updateAvailability();
        yield book.save();
        const borrow = yield Borrow_1.default.create({ book: bookId, quantity, dueDate });
        res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Borrowing failed', error });
    }
});
exports.borrowBook = borrowBook;
const getBorrowedSummary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield Borrow_1.default.aggregate([
            { $group: { _id: '$book', totalQuantity: { $sum: '$quantity' } } },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            { $unwind: '$book' },
            {
                $project: {
                    book: { title: '$book.title', isbn: '$book.isbn' },
                    totalQuantity: 1
                }
            }
        ]);
        res.json({ success: true, message: 'Borrowed books summary retrieved successfully', data: summary });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve summary', error });
    }
});
exports.getBorrowedSummary = getBorrowedSummary;
