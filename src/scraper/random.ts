import axios from "axios";
import type { EpisodeMetadata, HentaiMetadata } from "../types/interfaces.js";
import { axiosConfig, baseUrl, endpoints } from "../utils/config.js";
import { get } from "./get.js";

/**
 * Get a random hentai episode or page.
 *
 * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of hentai episode or page metadata.
 */
export const random = async (): Promise<HentaiMetadata | EpisodeMetadata> => {
  const res = await axios.get(baseUrl + endpoints.random, axiosConfig);
  return await get(res.request._redirectable._currentUrl);
};
