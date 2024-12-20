import { PageData } from './types'
import { CacheService } from './cacheService'

export class FetchService<T> {
  private url: string | null
  private resourceBaseUrl: string
  private cacheService: CacheService

  constructor(initialPath: string) {
    this.url = initialPath
    this.resourceBaseUrl = this.getResourceBaseUrl(initialPath)
    this.cacheService = new CacheService()
  }
  private getResourceBaseUrl = (path: string) =>
    path.split('/').slice(0, -1).join('/')
  private async request(url: string): Promise<PageData<T>> {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`)
    }

    return response.json()
  }

  async *fetchData(): AsyncGenerator<T> {
    const initUrl = this.url

    while (this.url) {
      const pageData =
        initUrl === this.url
          ? await this.request(this.url)
          : await this.cacheService.fetchWithCache<PageData<T>>(
              `${this.url}`,
              () => this.request(this.url!)
            )
      const { data, next } = pageData
      for (const item of data) {
        yield item
      }

      this.url = next ? `${this.resourceBaseUrl}/${next}` : null
    }
  }
}
