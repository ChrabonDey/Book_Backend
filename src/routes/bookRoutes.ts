import express, { RequestHandler } from 'express';
import { createBook, getAllBooks, deleteBook, getBookById, updateBook } from '../controllers/bookController';

const bookRoutes = express.Router();

bookRoutes.post('/books',createBook as RequestHandler);
bookRoutes.get('/books', getAllBooks);
bookRoutes.get('/books/:bookId', getBookById as RequestHandler);
bookRoutes.put('/books/:bookId', updateBook as RequestHandler);
bookRoutes.delete('/books/:bookId', deleteBook);

export default bookRoutes;
