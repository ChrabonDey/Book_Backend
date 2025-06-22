import { Request, Response } from 'express';
import Book from '../models/Book';
import Borrow from '../models/Borrow';

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.copies < quantity) {
      return res.status(400).json({ success: false, message: 'Not enough copies', error: 'Insufficient stock' });
    }

    book.copies -= quantity;
    await book.updateAvailability();
    await book.save();

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    res.status(201).json({ success: true, message: 'Book borrowed successfully', data: borrow });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Borrowing failed', error });
  }
};

export const getBorrowedSummary = async (_req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
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
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve summary', error });
  }
};