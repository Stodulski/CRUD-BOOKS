import { Request, Response } from 'express'
import EditorialModel from '../schema/editorial'
import { validateCUIT } from '../utils/validations'

export const createEditorial = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, address, cuit } = req.body
    const validateDocument = validateCUIT(cuit)
    if (!validateDocument) {
      res.status(400).json({ message: 'Invalid CUIT format' })
      return
    }
    const editorial = new EditorialModel({ name, address, cuit })
    await editorial.save()
    res.status(201).json(editorial)
  } catch (error) {
    res.status(500).json({ message: 'Error creating the editorial' })
  }
}

export const getAllEditorials = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const editorials = await EditorialModel.find()
    res.status(200).json(editorials)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching editorials' })
  }
}

export const getEditorialById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const editorial = await EditorialModel.findById(id)
    if (editorial == null) {
      res.status(404).json({ message: 'Editorial not found' })
      return
    }
    res.status(200).json(editorial)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the editorial' })
  }
}

export const updateEditorial = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const { name, address, cuit } = req.body

    const validateDocument = validateCUIT(cuit)
    if (!validateDocument) {
      res.status(400).json({ message: 'Invalid CUIT format' })
      return
    }

    const updatedEditorial = await EditorialModel.findByIdAndUpdate(
      id,
      { name, address, cuit },
      { new: true, runValidators: true }
    )

    if (updatedEditorial == null) {
      res.status(404).json({ message: 'Editorial not found' })
      return
    }

    res.status(200).json(updatedEditorial)
  } catch (error) {
    res.status(500).json({ message: 'Error updating the editorial' })
  }
}

export const deleteEditorial = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const deletedEditorial = await EditorialModel.findByIdAndDelete(id)
    if (deletedEditorial == null) {
      res.status(404).json({ message: 'Editorial not found' })
      return
    }
    res.status(200).json({ message: 'Editorial deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the editorial' })
  }
}
