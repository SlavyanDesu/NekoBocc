import axios from "axios";
import { load } from "cheerio";
import type { HentaiRelease } from "../types/interfaces.js";
import { axiosConfig, baseUrl, endpoints } from "../utils/config.js";

/**
 * Get a list of released hentai.
 *
 * @param {number} [page=1] - Page number to be shown. Default is `1`.
 * @returns {Promise<HentaiRelease[]>} Array object of released hentai.
 */
export const release = async (page: number = 1): Promise<HentaiRelease[]> => {
  const res = await axios.get(
    baseUrl + endpoints.latest.replace("__PAGE", page.toString()),
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
