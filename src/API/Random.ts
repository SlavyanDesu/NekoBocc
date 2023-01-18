import axios from 'axios'
import { header, baseUrl, endpoints } from '../util/shared.js'
import { get } from './Get.js'
import type { HentaiMetadata, EpisodeMetadata } from '../util/interfaces.js'

/**
 * Get random hentai or episode page.
 *
 * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of episode or hentai metadata.
 */
export const random = async (): Promise<HentaiMetadata | EpisodeMetadata> => {
  const res = await axios.get(baseUrl + endpoints.random, header)
  return await get(res.request._redirectable._currentUrl)
}
