import { Schema, model } from 'mongoose'
import { AuthorSchema } from '../types'

export const authorSchema = new Schema<AuthorSchema>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dni: { type: String, required: true },
  nationality: { type: String, required: true }
})

const AuthorModel = model<AuthorSchema>('Author', authorSchema)

export default AuthorModel
