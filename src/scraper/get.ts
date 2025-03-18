import axios from "axios";
import { load } from "cheerio";
import type { EpisodeMetadata, HentaiMetadata } from "../types/interfaces";
import { axiosConfig } from "../utils/config";

/**
 * Get the metadata of a specific hentai episode or page from a valid URL.
 *
 * @param {string} url - Hentai episode or page URL.
 * @returns {Promise<HentaiMetadata | EpisodeMetadata>} Object of hentai episode or page metadata.
 */
export const get = async (url: string): Promise<HentaiMetadata | EpisodeMetadata> => {
  const res = await axios.get(url, axiosConfig);
  const $ = load(res.data);

  if (url.includes("/hentai/")) {
    const url = $("div.episodelist > ul > li a").map((_i, e) => $(e).attr("href")).get();
    const episode = $("div.episodelist > ul > li").length;
    const list = $("div.listinfo li");

    const result: HentaiMetadata = {
      img: $("div.imgdesc").find("img").attr("src") ?? "",
      title: $("title").text().trim() ?? "",
      synopsis: $("span.desc").find("p").text().trim() ?? "",
      views: Number($("div.tabs.tab2").last().text().split(" ")[0]) || 0,
      japanese:
        list
          .filter((_i, el) => $(el).find("b").text().includes("Japanese"))
          .contents()
          .not("b")
          .text()
          .trim()
          .replace(/^:\s*/, "") || "",
      category:
        list
          .filter((_i, el) => $(el).find("b").text().includes("Jenis"))
          .contents()
          .not("b")
          .text()
          .trim()
          .replace(/^:\s*/, "") || "",
      episode: episode,
      status:
        list
          .filter((_i, el) => $(el).find("b").text().includes("Status"))
          .contents()
          .not("b")
          .text()
          .trim()
          .replace(/^:\s*/, "") || "",
      aired:
        list
          .filter((_i, el) => $(el).find("b").text().includes("Tayang"))
          .contents()
          .not("b")
          .text()
          .trim()
          .replace(/^:\s*/, "") || "",
      producer:
        list
          .filter((_i, el) => $(el).find("b").text().includes("Produser"))
          .contents()
          .not("b")
          .text()
          .trim()
          .replace(/^:\s*/, "")
          .split(/\s*,\s*/)
          .map((producer) => producer.trim()),
      genre:
        list
          .filter((_i, el) => $(el).find("b").text().includes("Genres"))
          .find("a")
          .map((_i, a) => $(a).text().trim())
          .get(),
      duration:
        list
          .filter((_i, el) => $(el).find("b").text().includes("Durasi"))
          .contents()
          .not("b")
          .text()
          .trim()
          .replace(/^:\s*/, "") || "",
      score: Number(
        list
          .filter((_i, el) => $(el).find("b").text().includes("Skor"))
          .contents()
          .not("b")
          .text()
          .trim()
          .replace(/^:\s*/, "") || 0
      ),
      url: url,
    };

    return result;
  } else {
    const konten = $("div.konten p");
    const result: EpisodeMetadata = {
      img: $("div.thm").find("img").attr("src") ?? "",
      title: $("title").text().trim() ?? "",
      synopsis: $("div.konten p").eq(1).text().trim() ?? "",
      genre: 
        konten
          .filter((_i, el) => $(el).text().includes("Genre"))
          .clone()
          .children("b")
          .remove()
          .end()
          .text()
          .trim()
          .split(/\s*,\s*/)
          .map((genre) => genre.trim()),
      producer:
        konten
          .filter((_i, el) => $(el).text().includes("Producers"))
          .clone()
          .children("b")
          .remove()
          .end()
          .text()
          .trim()
          .replace(/^:\s*/, "")
          .split(/\s*,\s*/)
          .map((producer) => producer.trim()),
      duration:
        konten
          .filter((_i, el) => $(el).text().includes("Duration"))
          .clone()
          .children("b")
          .remove()
          .end()
          .text()
          .trim() || "",
      size: {},
      download: {},
    };

    const sizeText =
      konten
        .filter((_i, el) => $(el).text().includes("Size"))
        .text()
        .replace(/^Size\s*:\s*/, "")
        .trim();

    if (sizeText) {
      sizeText.split("|").forEach((part) => {
        const match = part.trim().match(/(\d+P)\s*:\s*(\d+mb)/i);
        if (match) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, resolution, size] = match;
          result.size[resolution] = size.toUpperCase();
        }
      });
    }

    $("div.liner").each((_i, e) => {
      const qualityText = $(e).find("div.name").text().trim();
      const match = qualityText.match(/\[(\d+p)\]/i);

      if (match) {
        const resolution = match[1].toLowerCase();
        result.download[resolution] = [];

        $(e)
          .find("a")
          .each((_j, a) => {
            const link = $(a).attr("href")?.trim();
            if (link) {
              result.download[resolution].push(link);
            }
          });
      }
    });

    return result;
  }
};
