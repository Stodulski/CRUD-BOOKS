import { Schema, model } from 'mongoose'
import { EditorialSchema } from '../types'

export const editorialSchema = new Schema<EditorialSchema>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuit: { type: String, required: true, unique: true }
})

const EditorialModel = model<EditorialSchema>('Editorial', editorialSchema)

export default EditorialModel
