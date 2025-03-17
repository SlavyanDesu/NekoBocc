import axios from "axios";
import { load } from "cheerio";
import type { HentaiRelease } from "../util/interface";
import { axiosConfig, baseUrl, endpoints } from "../util/shared";

/**
 * Get list of released hentai.
 *
 * @param {number} [page=1] - Page number to be shown. Default is `1`.
 * @returns {Promise<HentaiRelease[]>} Array object of latest release.
 */
export const release = async (page = 1): Promise<HentaiRelease[]> => {
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
        .trim() || null;

    const duration =
      $(e)
        .find("p")
        .filter((_i, el) => $(el).text().includes("Duration"))
        .first()
        .text()
        .replace("Duration :", "")
        .trim() || null;

    array.push({
      img,
      title,
      url,
      genre,
      duration,
    });
  });
  return array;
};
