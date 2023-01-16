import axios from 'axios'
import { load } from 'cheerio'
import { baseUrl, endpoints, header } from '../util/shared.js'
import type { HentaiRelease } from '../util/interfaces.js'

/**
 * Get list of released hentai.
 * 
 * @param {string} [page=1] - Page number to be shown. Default is `1`.
 * @returns {Promise<HentaiRelease[]>} Array object of latest release.
 */
export const release = async (page: number = 1): Promise<HentaiRelease[]> => {
  try {
    const res = await axios.get(baseUrl + endpoints.latest.replace('__PAGE', page.toString()), header)
    const $ = load(res.data)
    const array: HentaiRelease[] = []
    $('div.result div.top').each((_i, e) => {
      const img = $(e).find('div.limitnjg > img').attr('src')!
      const title = $(e).find('h2 > a').text()
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
