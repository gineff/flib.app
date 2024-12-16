import { getList } from '@/utils/getList'
import { makeAutoObservable } from 'mobx'

export class ListStore {
  list = []
  constructor() {
    this.list = []
    makeAutoObservable(this)
  }
  load(count: number) {
    const items = []
    let isListFinished = false
    while (items.length < count || isListFinished) {
      this.list = getList('/popular')
    }
  }
}

export const listStore = new ListStore()
