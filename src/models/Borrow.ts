import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema: Schema<IBorrow> = new Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: [1, 'Quantity must be at least 1'] },
    dueDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBorrow>('Borrow', borrowSchema);