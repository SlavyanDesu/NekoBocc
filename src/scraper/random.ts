import type { EpisodeMetadata, HentaiMetadata, IError } from '../types/interfaces.js';
import { baseUrl, endpoints, headersConfig } from '../utils/config.js';
import { get } from './get.js';

/**
 * Get a random hentai episode or page.
 *
 * @returns {Promise<HentaiMetadata | EpisodeMetadata | IError>} Object of hentai episode or page metadata.
 */
export const random = async (): Promise<HentaiMetadata | EpisodeMetadata | IError> => {
	try {
		const res = await fetch(baseUrl + endpoints.random, {
			method: 'GET',
			headers: headersConfig.headers,
			redirect: 'manual',
		});

		if (res.status >= 300 && res.status < 400) {
			const redirectUrl = res.headers.get('location');
			if (!redirectUrl) throw new Error('Redirect location not found');

			return await get(redirectUrl);
		}

		throw new Error(`Unexpected response: ${res.status}`);
	} catch (err) {
		console.error(err);
		return {
			error: err instanceof Error ? err.message : 'Unknown error',
		};
	}
};
