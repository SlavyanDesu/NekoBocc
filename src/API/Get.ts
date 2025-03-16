import axios from 'axios';
import { load } from 'cheerio';
import type { EpisodeMetadata, HentaiMetadata, TextIndex } from '../util/interfaces';

/**
 * Get metadata of episode or hentai page from a valid URL.
 *
 * @param {string} url - Nekopoi episode or hentai page URL.
 * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of episode or hentai metadata.
 */
export const get = async (url: string): Promise<HentaiMetadata | EpisodeMetadata> => {
  const res = await axios.get(url);
  const $ = load(res.data);

  if (url.includes('/hentai/')) {
    const img = $('div.imgdesc').find('img').attr('src');
    const title = $('title').text();
    const synopsis = $('span.desc').find('p').text();
    const views = Number($('div.tabs.tab2').last().text().split(' ')[0]);
    const url: string[] = [];
    let episode;

    $('div.episodelist > ul > li').each((_i, e) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      url.push($(e).find('a').attr('href')!);
      episode = url.length;
    });

    const array: TextIndex[] = [];
    $('div.listinfo li').each((_i, e) => {
      array.push({ text: $(e).text() });
    });

    const result: HentaiMetadata = {
      img: img,
      title: title,
      synopsis: synopsis,
      views: views,
      japanese: array[0].text.split(' ')[1],
      category: array[1].text.split(' ')[1],
      episode: episode,
      status: array[3].text.split(' ')[1],
      aired: array[4].text.replace('Tayang: ', ''),
      producer: array[5].text.replace('Producers: ', ''),
      genre: array[6].text.replace('Genres: ', ''),
      duration: array[7].text.replace('Durasi: ', ''),
      score: Number(array[8].text.replace('Skor: ', '')),
      url: url
    };
    return result;
  } else {
    const result: EpisodeMetadata = {
      img: $('div.thm').find('img').attr('src') || '',
      title: $('title').text().trim() || '',
      synopsis: $('div.konten p').eq(1).text().trim() || '',
      genre:
        $('div.konten p')
          .filter((_, el) => $(el).text().includes('Genre'))
          .clone()
          .children('b')
          .remove()
          .end()
          .text()
          .trim() || '',
      producer:
        $('div.konten p')
          .filter((_, el) => $(el).text().includes('Producers'))
          .clone()
          .children('b')
          .remove()
          .end()
          .text()
          .trim()
          .replace(/^:\s*/, '') || '',
      duration:
        $('div.konten p')
          .filter((_, el) => $(el).text().includes('Duration'))
          .text()
          .replace(/^Duration\s*:\s*/, '')
          .trim()
          .toLowerCase() || '',
      size: {},
      download: {}
    };

    const sizeText = $('div.konten p')
      .filter((_, el) => $(el).text().includes('Size'))
      .text()
      .replace(/^Size\s*:\s*/, '')
      .trim();
    if (sizeText) {
      sizeText.split('|').forEach((part) => {
        const match = part.trim().match(/(\d+P)\s*:\s*(\d+mb)/i);
        if (match) {
          const [_, resolution, size] = match;
          result.size[resolution] = size;
        }
      });
    }

    $('div.liner').each((_i, e) => {
      const qualityText = $(e).find('div.name').text().trim();
      const match = qualityText.match(/\[(\d+p)\]/i);
      if (match) {
        const resolution = match[1].toLowerCase();
        result.download[resolution] = [];

        $(e)
          .find('a')
          .each((_j, a) => {
            const link = $(a).attr('href')?.trim();
            if (link) {
              result.download[resolution].push(link);
            }
          });
      }
    });
    return result;
  }
};
