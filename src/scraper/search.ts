import axios from "axios";
import { load } from "cheerio";
import type { HentaiRelease } from "../types/interfaces";
import { axiosConfig, baseUrl, endpoints } from "../utils/config";

/**
 * Get a search result from NekoPoi.
 *
 * @param {string} query - Search query.
 * @returns {Promise<HentaiRelease[]>} Array object of search result.
 */
export const search = async (query: string): Promise<HentaiRelease[]> => {
  const res = await axios.get(
    baseUrl + endpoints.search.replace("__QUERY", encodeURIComponent(query)),
    axiosConfig
  );
  const $ = load(res.data);
  const array: HentaiRelease[] = [];

  $("div.result div.top").each((_i, e) => {
    const img = $(e).find("div.limitnjg > img").attr("src") ?? "";
    const title = $(e).find("h2 > a").text().trim();
    const href = $(e).find("h2 > a").attr("href");
    const url = href ? new URL(href, baseUrl).href : "";

    const genre =
      $(e)
        .find("p")
        .filter((_i, el) => $(el).text().includes("Genre"))
        .first()
        .text()
        .replace("Genre :", "")
        .trim()
        .split(/\s*,\s*/) || null;

    const duration =
      $(e)
        .find("p")
        .filter((_i, el) => $(el).text().includes("Duration"))
        .first()
        .text()
        .replace("Duration :", "")
        .trim() || null;

    array.push({ img, title, url, genre, duration });
  });

  return array;
};
