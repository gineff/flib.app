import { Chunk } from './types'

export class ChunkLoader {
  public firstChunkPath: string
  public chunk: Chunk | null = null
  constructor(firstChunkPath: string) {
    this.firstChunkPath = firstChunkPath
  }
  loadChunk = async (chunkPath: string) => {
    try {
      const response = await fetch(chunkPath)
      this.chunk = await response.json()
    } catch (e) {
      console.error(e)
      this.chunk = null
    }
  }
  next = async () => {
    if (!this.chunk?.next) {
      return null
    }
    this.loadChunk(this.chunk.next)
  }
}
