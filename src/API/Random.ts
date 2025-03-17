import axios from "axios";
import type { EpisodeMetadata, HentaiMetadata } from "../util/interface";
import { axiosConfig, baseUrl, endpoints } from "../util/shared";
import { get } from "./get";

/**
 * Get random hentai or episode page.
 *
 * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of episode or hentai metadata.
 */
export const random = async (): Promise<HentaiMetadata | EpisodeMetadata> => {
  const res = await axios.get(baseUrl + endpoints.random, axiosConfig);
  return await get(res.request._redirectable._currentUrl);
};
