export const baseUrl = 'https://nekopoi.care';

export const headersConfig = {
	headers: {
		'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
		Referer: baseUrl,
		'Accept-Language': 'en-US,en;q=0.9',
	},
};

export const endpoints = {
	latest: '/category/hentai/page/__PAGE',
	search: '/search/__QUERY',
	random: '/random',
};

/**
 * Check if URL match with NekoPoi's URL.
 *
 * @param {string} url - URL to check.
 * @returns {boolean}
 */
export const valid = (url: string): boolean =>
	new RegExp(/^(?:https?:\/\/)?(?:[^.]+\.)?nekopoi\.care(\/.*)?$/gm).test(url);
