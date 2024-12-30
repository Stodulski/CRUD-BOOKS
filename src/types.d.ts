import { Document } from 'mongoose'

export interface Author {
  firstName: string
  lastName: string
  dni: string
  nationality: string
}

export interface Book {
  authors: Author[]
  publisher: Editorial[]
  title: string
  genre: string
  price: number
  releaseDate: Date
  description: string
}

export interface Editorial {
  name: string
  address: string
  cuit: string
}

export interface EditorialSchema extends Editorial, Document {}
export interface AuthorSchema extends Author, Document {}
export interface BookSchema extends Book, Document {}
