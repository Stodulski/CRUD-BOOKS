import { Schema, model } from 'mongoose'
import { BookSchema } from '../types'
import { authorSchema } from './author'
import { editorialSchema } from './editorial'

const bookSchema = new Schema<BookSchema>({
  authors: { type: [authorSchema], required: true },
  publisher: { type: [editorialSchema], required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  price: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  description: { type: String, required: true }
})

const BookModel = model<BookSchema>('Book', bookSchema)

export default BookModel
