import * as Crypto from 'expo-crypto'
import { storage } from '@/storage'

export class CacheService {
  private static instance: CacheService
  constructor() {
    if (!CacheService.instance) {
      CacheService.instance = this
    }
    return CacheService.instance
  }

  private async hashUrl(url: string): Promise<string> {
    const hashed = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      url
    )
    return hashed
  }

  async fetchWithCache<T>(url: string, fetcher: () => Promise<T>): Promise<T> {
    const urlHash = await this.hashUrl(url)

    const cachedData = await storage.getItem(urlHash)
    if (cachedData) {
      console.log(`Fetching data from cache for URL: ${url}`)
      return JSON.parse(cachedData) as T
    }

    const data = await fetcher()

    await storage.setItem(urlHash, JSON.stringify(data))
    console.log(`Fetching data from network for URL: ${url}`)
    return data
  }
}

export const cacheService = new CacheService()
