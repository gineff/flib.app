import { BookCore } from '../stores/types'
import { PageData } from '@/utils/types'
import { cacheService } from '@/utils/cacheService'
export class FetchBooksService {
  // Todo вынести s3 origin в настройки
  s3 = 'http://flib.s3.hb.ru-msk.vkcloud-storage.ru'
  catalog: string
  startFileName: string
  // = 'http://flib.s3.hb.ru-msk.vkcloud-storage.ru/lists/1_new.json'
  constructor({ catalog, fileName }: { catalog: string; fileName: string }) {
    this.catalog = catalog
    this.startFileName = fileName
  }
  private async request(url: string): Promise<PageData<BookCore>> {
    const response = await fetch(url)
    return response.json()
  }
  async *pagesGenerator(): AsyncGenerator<PageData<BookCore>> {
    let url: string | null = `${this.s3}/${this.catalog}/${this.startFileName}`
    const startUrl = url

    while (url) {
      const pageData: PageData<BookCore> =
        startUrl === url
          ? await this.request(url)
          : await cacheService.fetchWithCache<PageData<BookCore>>(
              `${url}`,
              () => this.request(url!)
            )
      yield pageData

      url = pageData?.next
        ? `${this.s3}/${this.catalog}/${pageData.next}`
        : null
    }
  }
  async *booksCoresGenerator(): AsyncGenerator<BookCore> {
    for await (const pageData of this.pagesGenerator()) {
      for (const item of pageData.data) {
        yield item
      }
    }
  }

  getPages = () => this.pagesGenerator()
  getBooksCores = () => this.booksCoresGenerator()
}
