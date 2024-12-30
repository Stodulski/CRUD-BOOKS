import { Request, Response } from 'express'
import AuthorModel from '../schema/author'
import { validateDNI } from '../utils/validations'

export const createAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, dni, nationality } = req.body
    const validateDocument = validateDNI(dni)
    if (!validateDocument) {
      res.status(400).json({ message: 'Invalid DNI format' })
      return
    }
    const author = new AuthorModel({
      firstName,
      lastName,
      dni,
      nationality
    })
    await author.save()
    res.status(201).json({ author })
  } catch (error) {
    res.status(500).json({ message: 'Error creating the author' })
  }
}

export const getAllAuthors = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const authors = await AuthorModel.find()
    res.status(200).json({ authorsList: authors })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching authors' })
  }
}

export const getAuthorById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const author = await AuthorModel.findById(id)
    if (author == null) {
      res.status(404).json({ message: 'Author not found' })
      return
    }
    res.status(200).json(author)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the author' })
  }
}

// Actualizar un autor
export const updateAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const { firstName, lastName, dni, nationality } = req.body

    const validateDocument = validateDNI(dni)
    if (!validateDocument) {
      res.status(400).json({ message: 'Invalid DNI format' })
      return
    }

    const updatedAuthor = await AuthorModel.findByIdAndUpdate(
      id,
      { firstName, lastName, dni, nationality },
      { new: true, runValidators: true }
    )

    if (updatedAuthor == null) {
      res.status(404).json({ message: 'Author not found' })
      return
    }

    res.status(200).json({ updatedAuthor })
  } catch (error) {
    res.status(500).json({ message: 'Error updating the author' })
  }
}

// Eliminar un autor
export const deleteAuthor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const deletedAuthor = await AuthorModel.findByIdAndDelete(id)
    if (deletedAuthor == null) {
      res.status(404).json({ message: 'Author not found' })
      return
    }
    res.status(200).json({ message: 'Author deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the author' })
  }
}
