import express, { RequestHandler } from 'express';
import { borrowBook, getBorrowedSummary } from '../controllers/borrowController';

const borrowRoutes = express.Router();

borrowRoutes.post('/borrow', borrowBook as RequestHandler);
borrowRoutes.get('/borrow', getBorrowedSummary);

export default borrowRoutes;