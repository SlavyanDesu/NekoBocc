import axios from "axios";
import { load } from "cheerio";
import type { HentaiRelease } from "../util/interfaces";
import { baseUrl, endpoints } from "../util/shared";

/**
 * Get list of released hentai.
 *
 * @param {number} [page=1] - Page number to be shown. Default is `1`.
 * @returns {Promise<HentaiRelease[]>} Array object of latest release.
 */
export const release = async (page = 1): Promise<HentaiRelease[]> => {
  const res = await axios.get(
    baseUrl + endpoints.latest.replace("__PAGE", page.toString()),
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Referer: baseUrl,
        "Accept-Language": "en-US,en;q=0.9",
      },
    }
  );
  const $ = load(res.data);
  const array: HentaiRelease[] = [];

  $("div.result div.top").each((_i, e) => {
    const img = $(e).find("div.limitnjg > img").attr("src") || "";
    const title = $(e).find("h2 > a").text().trim();
    const url = new URL($(e).find("h2 > a").attr("href") || "", baseUrl).href;

    const genre = $(e)
      .find("p")
      .filter((_i, el) => $(el).text().includes("Genre"))
      .text()
      .replace("Genre :", "")
      .trim();

    const duration = $(e)
      .find("p")
      .filter((_i, el) => $(el).text().includes("Duration"))
      .text()
      .replace("Duration :", "")
      .trim();

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
