import { makeAutoObservable } from 'mobx'
import { ListBookCores } from './listBookCores'
import { listsDetails } from './constants'

class ListsStore {
  lists: Record<string, InstanceType<typeof ListBookCores>> = {}
  constructor() {
    makeAutoObservable(this)
  }
  getList = (name: string) => {
    if (!this.lists[name]) {
      this.lists[name] = new ListBookCores(name as keyof typeof listsDetails)
    }
    return this.lists[name]
  }
}

export const listsStore = new ListsStore()
