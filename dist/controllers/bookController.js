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
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.create(req.body);
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const cleanedErrors = {};
            for (const key in error.errors) {
                const original = error.errors[key];
                cleanedErrors[key] = {
                    message: original.message,
                    name: original.name,
                    properties: {
                        message: original.properties.message,
                        type: original.properties.type,
                        min: original.properties.min
                    },
                    kind: original.kind,
                    path: original.path,
                    value: original.value
                };
            }
            return res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: error.name,
                    errors: cleanedErrors
                }
            });
        }
        res.status(500).json({ message: 'Unexpected server error', success: false, error });
    }
});
exports.createBook = createBook;
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
        const query = filter ? { genre: filter } : {};
        const books = yield Book_1.default.find(query).sort({ [sortBy]: sort === 'asc' ? 1 : -1 }).limit(parseInt(limit));
        res.json({ success: true, message: 'Books retrieved successfully', data: books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching books', error });
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findById(req.params.bookId);
        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' });
        res.json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving book', error });
    }
});
exports.getBookById = getBookById;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield Book_1.default.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        if (!book)
            return res.status(404).json({ success: false, message: 'Book not found' });
        yield book.updateAvailability();
        res.json({ success: true, message: 'Book updated successfully', data: book });
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const cleanedErrors = {};
            for (const key in error.errors) {
                const original = error.errors[key];
                cleanedErrors[key] = {
                    message: original.message,
                    name: original.name,
                    properties: {
                        message: original.properties.message,
                        type: original.properties.type,
                        min: original.properties.min
                    },
                    kind: original.kind,
                    path: original.path,
                    value: original.value
                };
            }
            return res.status(400).json({
                message: 'Validation failed',
                success: false,
                error: {
                    name: error.name,
                    errors: cleanedErrors
                }
            });
        }
        res.status(500).json({ message: 'Unexpected server error', success: false, error });
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Book_1.default.findByIdAndDelete(req.params.bookId);
        res.json({ success: true, message: 'Book deleted successfully', data: null });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Delete failed', error });
    }
});
exports.deleteBook = deleteBook;
