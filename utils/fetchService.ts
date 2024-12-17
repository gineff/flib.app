import { PageData } from './types'
import { CacheService } from './cacheService'

export class FetchService<T> {
  private url: string | null
  private cacheService: CacheService

  constructor(initialPath: string) {
    this.url = initialPath
    this.cacheService = new CacheService()
  }
  private async fetchRequest(url: string): Promise<T[]> {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    const body: PageData<T> = await response.json()

    const { data, next } = body
    this.url = next ?? null

    return data
  }

  async *fetchData(): AsyncGenerator<T> {
    const initUrl = this.url

    while (this.url) {
      const data =
        initUrl === this.url
          ? await this.fetchRequest(this.url)
          : await this.cacheService.fetchWithCache(this.url, () =>
              this.fetchRequest(this.url!)
            )

      for (const item of data) {
        yield item
      }
    }
  }
}
