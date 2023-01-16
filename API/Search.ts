import axios from 'axios'
import { load } from 'cheerio'
import { baseUrl, endpoints, header } from '../util/shared.js'
import type { HentaiRelease } from '../util/interfaces.js'

/**
 * Get search result.
 * 
 * @param {string} query - A search query.
 * @returns {Promise<HentaiRelease[]>} Array object of search result.
 */
export const search = async (query: string): Promise<HentaiRelease[]> => {
  try {
    const res = await axios.get(baseUrl + endpoints.search.replace('__QUERY', encodeURIComponent(query)), header)
    const $ = load(res.data)
    const array: HentaiRelease[] = []
    $('div.result div.top').each((_i, e) => {
      const img = $(e).find('div.limitnjg > img').attr('src')!
      const title = $(e).find('h2').text()
      const url = $(e).find('h2 > a').attr('href')!
      array.push({
        img,
        title,
        url
      })
    })
    return array
  } catch (err) {
    throw err
  }
}
