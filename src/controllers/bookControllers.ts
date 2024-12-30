import { Request, Response } from 'express'
import BookModel from '../schema/book'
import AuthorModel from '../schema/author'
import EditorialModel from '../schema/editorial'
import { normalizeDate } from '../utils/validations'

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      authors,
      publisher,
      title,
      genre,
      price,
      releaseDate,
      description
    } = req.body

    const authorIds = Array.isArray(authors) ? authors : [authors]

    const authorInfoArray: any[] = []

    for (const authorId of authorIds) {
      if (typeof authorId !== 'string') {
        res.status(400).json({ message: 'Invalid author ID format.' })
        return
      }
      const author = await AuthorModel.findById(authorId)
      if (author == null) {
        res
          .status(400)
          .json({ message: `Author with ID ${authorId} does not exist.` })
        return
      }
      authorInfoArray.push(author)
    }

    if (typeof publisher !== 'string') {
      res.status(400).json({ message: 'Invalid publisher ID format.' })
      return
    }
    const editorial = await EditorialModel.findById(publisher)
    if (editorial == null) {
      res
        .status(400)
        .json({ message: `Publisher with ID ${publisher} does not exist.` })
      return
    }

    const normalizedReleaseDate = normalizeDate(releaseDate)

    const book = new BookModel({
      authors: authorInfoArray,
      publisher: editorial,
      title,
      genre,
      price,
      releaseDate: normalizedReleaseDate,
      description
    })

    await book.save()
    res.status(201).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating the book' })
  }
}

export const getBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id
    const book = await BookModel.findById(bookId).populate('authors publisher')
    if (book == null) {
      res.status(404).json({ message: 'Book not found' })
      return
    }
    res.status(200).json(book)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving the book' })
  }
}

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { genre, page = 1, limit = 10 } = req.query

    const query: any = {}

    if (genre) {
      query.genre = genre
    }

    console.log(query)
    const books = await BookModel.find(query)
      .populate('authors publisher')
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))

    const totalBooks = await BookModel.countDocuments(query)

    res.status(200).json({
      books,
      totalBooks,
      totalPages: Math.ceil(totalBooks / Number(limit)),
      currentPage: Number(page)
    })
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books' })
  }
}

export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookId = req.params.id
    const {
      authors,
      publisher,
      title,
      genre,
      price,
      releaseDate,
      description
    } = req.body

    for (const authorId of authors) {
      if (typeof authorId !== 'string') {
        res.status(400).json({ message: 'Invalid author ID format.' })
        return
      }

      const author = await AuthorModel.findById(authorId)

      if (author == null) {
        res
          .status(400)
          .json({ message: `Author with ID ${authorId} does not exist.` })
        return
      }
    }

    if (typeof publisher !== 'string') {
      res.status(400).json({ message: 'Invalid publisher ID format.' })
      return
    }
    const editorial = await EditorialModel.findById(publisher)
    if (editorial == null) {
      res
        .status(400)
        .json({ message: `Publisher with ID ${publisher} does not exist.` })
      return
    }

    const normalizedReleaseDate = normalizeDate(releaseDate)

    const updatedBook = await BookModel.findByIdAndUpdate(
      bookId,
      {
        authors,
        publisher,
        title,
        genre,
        price,
        releaseDate: normalizedReleaseDate,
        description
      },
      { new: true }
    )

    if (updatedBook == null) {
      res.status(404).json({ message: 'Book not found' })
      return
    }

    res.status(200).json(updatedBook)
  } catch (error) {
    res.status(500).json({ message: 'Error updating the book' })
  }
}

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookId = req.params.id
    const deletedBook = await BookModel.findByIdAndDelete(bookId)
    if (deletedBook == null) {
      res.status(404).json({ message: 'Book not found' })
      return
    }
    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the book' })
  }
}
