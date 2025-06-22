// src/controllers/bookController.ts
import { Request, Response } from 'express';
import Book from '../models/Book';

export const createBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({ success: true, message: 'Book created successfully', data: book });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const cleanedErrors: Record<string, any> = {};
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
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { filter, sortBy = 'createdAt', sort = 'desc', limit = '10' } = req.query;
    const query: any = filter ? { genre: filter } : {};
    const books = await Book.find(query).sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 }).limit(parseInt(limit as string));
    res.json({ success: true, message: 'Books retrieved successfully', data: books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching books', error });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, message: 'Book retrieved successfully', data: book });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving book', error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    await book.updateAvailability();
    res.json({ success: true, message: 'Book updated successfully', data: book });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const cleanedErrors: Record<string, any> = {};
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
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.bookId);
    res.json({ success: true, message: 'Book deleted successfully', data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed', error });
  }
};
