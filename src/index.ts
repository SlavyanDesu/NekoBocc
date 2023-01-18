import { release, search, get, random } from './API/index.js'
import { valid } from './util/shared.js'
import type { HentaiRelease, HentaiMetadata, EpisodeMetadata } from './util/interfaces.js'

export default class NekoBocc {
  /**
   * Get list of released hentai.
   *
   * @param {string} [page=1] - Page number to be shown. Default is `1`.
   * @returns {Promise<HentaiRelease[]>} Array object of latest release.
   */
  release(page?: number): Promise<HentaiRelease[]> {
    return release(page)
  }

  /**
   * Get search result.
   *
   * @param {string} query - A search query.
   * @returns {Promise<HentaiRelease[]>} Array object of search result.
   */
  search(query: string): Promise<HentaiRelease[]> {
    if (!query || valid(query)) {
      throw Error('Please provide a valid search query!')
    } else {
      return search(query)
    }
  }

  /**
   * Get metadata of episode or hentai page from a valid URL.
   *
   * @param {string} url - Nekopoi episode or hentai page URL.
   * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of episode or hentai metadata.
   */
  get(url: string): Promise<HentaiMetadata | EpisodeMetadata> {
    if (!url || !valid(url)) {
      throw Error('Please provide a valid URL!')
    } else {
      return get(url)
    }
  }

  /**
   * Get random hentai or episode page.
   *
   * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of episode or hentai metadata.
   */
  random(): Promise<HentaiMetadata | EpisodeMetadata> {
    return random()
  }
}
