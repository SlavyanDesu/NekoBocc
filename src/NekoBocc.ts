import axios from 'axios';
import * as cheerio from 'cheerio';
const baseUrl = 'https://nekopoi.care/';
const valid = (url: string) => url.match(new RegExp(/^(?:https?:\/\/)?(?:[^\.]+\.)?nekopoi\.care(\/.*)?$/gm));
const header = {
	headers: {
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
	}
};

export interface NekopoiResult {
	img: string;
	title: string;
	link: string;
}

export interface NekopoiTextIndex {
	i: number;
	text: string;
}

export interface NekopoiEpisodeMetadata {
	img: string;
	title: string;
	synopsis: string;
	views: number
	japanese: string;
	category: string;
	episode: number;
	status: string;
	aired: string;
	producers: string;
	genre: string;
	duration: string;
	score: number;
}

export interface NekopoiPageMetadata {
	img: string;
	title: string;
	synopsis: string;
	genre: string;
	producers: string;
	duration: string;
	quality: Array<string>;
	link: Array<string>;
}

/**
 * Get list of latest post from Nekopoi
 * @returns {Promise<NekopoiResult[]>} Nekopoi latest post object
 */
export const latest = async (): Promise<NekopoiResult[] | undefined> => {
	try {
		const res = await axios.get(baseUrl, header);
		const $ = cheerio.load(res.data);
		const img: Array<string> = [], title: Array<string> = [], link: Array<string> = [], format: NekopoiResult[] = [];
		$('div.eropost').each((i, e) => {
			$(e).find('h2').each((i, e) => {
				title.push($(e).find('a').text().trim());
				link.push($(e).find('a').attr('href')!);
			});
			img.push($(e).find('img').attr('src')!);
		});
		for (let i = 0; i < title.length; i++) {
			const obj = { img: img[i], title: title[i], link: link[i] };
			format.push(obj);
		}
		return format;
	} catch (err) {
		console.error(err);
	}
};

/**
 * Get result from given query
 * @param {string} query Search query
 * @returns {Promise<NekopoiResult[] | void>} Result object
 */
export const search = async (query: string): Promise<NekopoiResult[] | void> => {
	if (!query) {
		return console.error('Please provide a search terms.');
	} else {
		try {
			const url = `${baseUrl}?s=${encodeURIComponent(query)}`;
			const res = await axios.get(url, header);
			const img: Array<string> = [], title: Array<string> = [], link: Array<string> = [], format: NekopoiResult[] = [];
			const $ = cheerio.load(res.data);
			$('div.top').each((i, e) => {
				$(e).find('h2').each((i, e) => {
					title.push($(e).find('a').text().trim());
					link.push($(e).find('a').attr('href')!);
				});
				img.push($(e).find('img').attr('src')!);
			});
			for (let i = 0; i < title.length; i++) {
				const obj = { img: img[i], title: title[i], link: link[i] };
				format.push(obj);
			}
			return format;
		} catch (err) {
			console.error(err);
		}
	}
};

/**
 * Get Nekopoi hentai/JAV page metadata object
 * @param {string} url Nekopoi page URL
 * @returns {Promise<NekopoiEpisodeMetadata | NekopoiPageMetadata | void>} Nekopoi hentai/JAV metadata object
 */
export const get = async (url: string): Promise<NekopoiEpisodeMetadata | NekopoiPageMetadata | void> => {
	if (!valid(url)) {
		return console.error('Please provide a valid Nekopoi link!');
	} else {
		try {
			const res = await axios.get(url, header);
			if (!url.includes('/hentai/')) {
				const $ = cheerio.load(res.data);
				const img = $('div.thm').find('img').attr('src');
				const title = $('title').text();
				const link: Array<string> = [], quality: Array<string> = [], data: NekopoiTextIndex[] = [];
				$('div.contentpost p').each((i, e) => {
					data.push({ i, text: $(e).text() });
				});
				$('div.liner').each((i, e) => {
					quality.push($(e).find('div.name').text());
					link.push($(e).find('a').attr('href')!);
				});
				const format: NekopoiPageMetadata = {
					img: img!,
					title: title,
					synopsis: data[1].text,
					genre: data[2].text.replace('Genre : ', ''),
					producers: data[4].text.replace('Producers : ', ''),
					duration: data[5].text.replace('Duration : ', ''),
					quality: quality,
					link: link
				};
				return format;
			} else {
				const $ = cheerio.load(res.data);
				const title = $('title').text().replace(' – NekoPoi', '');
				const views = Number(
					$('div.tabs.tab2').next().text().replace('kali', '')
				);
				let img: string | undefined, synopsis: string | undefined, episode: number | undefined;
				const data: NekopoiTextIndex[] = [];
				$('div.imgdesc').each((i, e) => {
					img = $(e).find('img').attr('src');
					synopsis = $(e).find('p').text();
				});
				$('div.listinfo ul li').each((i, e) => {
					data.push({ i, text: $(e).text() });
				});
				$('div.episodelist').each((i, e) => {
					episode = $(e).find('li').length;
				});
				const format: NekopoiEpisodeMetadata = {
					img: img!,
					title: title,
					synopsis: synopsis!,
					views: views,
					japanese: data[0].text.replace('Japanese: ', ''),
					category: data[1].text.replace('Jenis: ', ''),
					episode: episode!,
					status: data[3].text.replace('Status: ', ''),
					aired: data[4].text.replace('Tayang: ', ''),
					producers: data[5].text.replace('Produser: ', ''),
					genre: data[6].text.replace('Genres: ', ''),
					duration: data[7].text.replace('Durasi: ', ''),
					score: Number(data[8].text.replace('Skor: ', ''))
				};
				return format;
			}
		} catch (err) {
			console.error(err);
		}
	}
};

/**
 * Get random hentai/JAV
 * @returns {Promise<NekopoiEpisodeMetadata | NekopoiPageMetadata | void>} Nekopoi page metadata object
 */
export const random = async (): Promise<NekopoiEpisodeMetadata | NekopoiPageMetadata | void> => {
	try {
		const res = await axios.get(`${baseUrl}random`, header);
		return await get(res.request._redirectable._currentUrl);
	} catch (err) {
		console.error(err);
	}
};