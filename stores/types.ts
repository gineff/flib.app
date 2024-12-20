export type BookId = string
export type AuthorId = number
export type GenresId = number

export type Author = {
  id: AuthorId
  name: string
}

export type Book = {
  id: BookId
  bid: string
  title: string
  authors: AuthorId[]
  genres?: string[]
  sequencesId?: number[]
  sequencesTitle?: string[]
  image?: string
  date?: string
  expired?: string
}

export type BookCore = [BookId, AuthorId[], GenresId[]?]
