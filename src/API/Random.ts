import axios from "axios";
import type { EpisodeMetadata, HentaiMetadata } from "../util/interfaces";
import { baseUrl, endpoints } from "../util/shared";
import { get } from "./Get";

/**
 * Get random hentai or episode page.
 *
 * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of episode or hentai metadata.
 */
export const random = async (): Promise<HentaiMetadata | EpisodeMetadata> => {
  const res = await axios.get(baseUrl + endpoints.random);
  return await get(res.request._redirectable._currentUrl);
};
