import axios from 'axios'
import { load } from 'cheerio'
import { header } from '../util/index.js'
import type { HentaiMetadata, EpisodeMetadata, TextIndex } from '../util/index.js'

/**
 * Get metadata of episode or hentai page from a valid URL.
 * 
 * @param {string} url - Nekopoi episode or hentai page URL. 
 * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of episode or hentai metadata.
 */
export const get = async (url: string): Promise<HentaiMetadata | EpisodeMetadata> => {
  try {
    const res = await axios.get(url, header)
    const $ = load(res.data)
    if(url.includes('/hentai/')) {
      const img = $('div.imgdesc').find('img').attr('src')!
      const title = $('title').text()
      const synopsis = $('span.desc').find('p').text()
      const views = Number($('div.tabs.tab2').last().text().split(' ')[0])
      let episode: number
      $('div.episodelist').each((_i, e) => {
        episode = $(e).find('li').length
      })
      const array: TextIndex[] = []
      $('div.listinfo li').each((_i, e) => {
        array.push({ text: $(e).text() })
      })
      const result: HentaiMetadata = {
        img: img,
        title: title,
        synopsis: synopsis,
        views: views,
        japanese: array[0].text.split(' ')[1],
        category: array[1].text.split(' ')[1],
        episode: episode!,
        status: array[3].text.split(' ')[1],
        aired: array[4].text.replace('Tayang: ', ''),
        producer: array[5].text.replace('Produser: ', ''),
        genre: array[6].text.replace('Genres: ', ''),
        duration: array[7].text.replace('Durasi: ', ''),
        score: Number(array[8].text.replace('Skor: ', ''))
      }
      return result
    } else {
      const img = $('div.thm').find('img').attr('src')!
      const title = $('title').text()
      const quality: string[] = []
      const download: string[] = []
      const array: TextIndex[] = []
      $('div.liner').each((_i, e) => {
        quality.push($(e).find('div.name').text())
        download.push($(e).find('a').attr('href')!)
      })
      $('div.konten p').each((_i, e) => {
        array.push({ text: $(e).text() })
      })
      const result: EpisodeMetadata = {
        img: img,
				title: title,
				synopsis: array[1].text,
				genre: array[2].text.replace('Genre : ', ''),
				producer: array[4].text.replace('Producers : ', ''),
				duration: array[5].text.replace('Duration : ', ''),
				quality: quality,
				download: download
      }
      return result
    }
  } catch (err) {
    throw err
  }
}