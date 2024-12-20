import { makeAutoObservable, runInAction } from 'mobx'
import { BookCore } from './types'
import { listsDetails } from './constants'
import { FetchBooksService } from '@/utils/fetchBooksService'

export class ListBookCores {
  label: string
  generator: AsyncGenerator<BookCore>
  bookCores: BookCore[] = []

  constructor(name: keyof typeof listsDetails) {
    const { catalog, fileName, label } = listsDetails[name]
    this.label = label
    this.generator = new FetchBooksService({
      catalog,
      fileName,
    }).getBooksCores()
    makeAutoObservable(this)
  }

  fetch = async (count: number): Promise<void> => {
    let buffer = []

    try {
      for await (const bookCore of this.generator) {
        console.log(' bookCore', bookCore)

        buffer.push(bookCore)
        if (buffer.length >= count) {
          break
        }
      }
      runInAction(() => {
        this.bookCores.push(...buffer)
      })
    } catch (error) {
      console.error('Error fetching metadata:', error)
    }
  }
}
