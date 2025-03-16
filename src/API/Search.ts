import axios from 'axios';
import { load } from 'cheerio';
import type { HentaiRelease } from '../util/interfaces';
import { baseUrl, endpoints } from '../util/shared';

/**
 * Get search result.
 *
 * @param {string} query - A search query.
 * @returns {Promise<HentaiRelease[]>} Array object of search result.
 */
export const search = async (query: string): Promise<HentaiRelease[]> => {
  const res = await axios.get(baseUrl + endpoints.search.replace('__QUERY', encodeURIComponent(query)));
  const $ = load(res.data);
  const array: HentaiRelease[] = [];

  $('div.result div.top').each((_i, e) => {
    const img = $(e).find('div.limitnjg > img').attr('src') || '';
    const title = $(e).find('h2 > a').text().trim();
    const url = new URL($(e).find('h2 > a').attr('href') || '', baseUrl).href;

    const genre = $(e)
      .find('p')
      .filter((_i, el) => $(el).text().includes('Genre'))
      .text()
      .replace('Genre :', '')
      .trim();

    const duration = $(e)
      .find('p')
      .filter((_i, el) => $(el).text().includes('Duration'))
      .text()
      .replace('Duration :', '')
      .trim();

    array.push({
      img,
      title,
      url,
      genre,
      duration
    });
  });
  return array;
};
