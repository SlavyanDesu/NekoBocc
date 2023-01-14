"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.get = exports.search = exports.latest = void 0;
const axios_1 = require("axios");
const cheerio = require("cheerio");
const baseUrl = 'https://nekopoi.care/';
const valid = (url) => url.match(new RegExp(/^(?:https?:\/\/)?(?:[^\.]+\.)?nekopoi\.care(\/.*)?$/gm));
const header = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
    }
};
const latest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(baseUrl, header);
        const $ = cheerio.load(res.data);
        const img = [], title = [], link = [], format = [];
        $('div.eropost').each((i, e) => {
            $(e).find('h2').each((i, e) => {
                title.push($(e).find('a').text().trim());
                link.push($(e).find('a').attr('href'));
            });
            img.push($(e).find('img').attr('src'));
        });
        for (let i = 0; i < title.length; i++) {
            const obj = { img: img[i], title: title[i], link: link[i] };
            format.push(obj);
        }
        return format;
    }
    catch (err) {
        console.error(err);
    }
});
exports.latest = latest;
const search = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!query) {
        return console.error('Please provide a search terms.');
    }
    else {
        try {
            const url = `${baseUrl}?s=${encodeURIComponent(query)}`;
            const res = yield axios_1.default.get(url, header);
            const img = [], title = [], link = [], format = [];
            const $ = cheerio.load(res.data);
            $('div.top').each((i, e) => {
                $(e).find('h2').each((i, e) => {
                    title.push($(e).find('a').text().trim());
                    link.push($(e).find('a').attr('href'));
                });
                img.push($(e).find('img').attr('src'));
            });
            for (let i = 0; i < title.length; i++) {
                const obj = { img: img[i], title: title[i], link: link[i] };
                format.push(obj);
            }
            return format;
        }
        catch (err) {
            console.error(err);
        }
    }
});
exports.search = search;
const get = (url) => __awaiter(void 0, void 0, void 0, function* () {
    if (!valid(url)) {
        return console.error('Please provide a valid Nekopoi link!');
    }
    else {
        try {
            const res = yield axios_1.default.get(url, header);
            if (!url.includes('/hentai/')) {
                const $ = cheerio.load(res.data);
                const img = $('div.thm').find('img').attr('src');
                const title = $('title').text();
                const link = [], quality = [], data = [];
                $('div.contentpost p').each((i, e) => {
                    data.push({ i, text: $(e).text() });
                });
                $('div.liner').each((i, e) => {
                    quality.push($(e).find('div.name').text());
                    link.push($(e).find('a').attr('href'));
                });
                const format = {
                    img: img,
                    title: title,
                    synopsis: data[1].text,
                    genre: data[2].text.replace('Genre : ', ''),
                    producers: data[4].text.replace('Producers : ', ''),
                    duration: data[5].text.replace('Duration : ', ''),
                    quality: quality,
                    link: link
                };
                return format;
            }
            else {
                const $ = cheerio.load(res.data);
                const title = $('title').text().replace(' – NekoPoi', '');
                const views = Number($('div.tabs.tab2').next().text().replace('kali', ''));
                let img, synopsis, episode;
                const data = [];
                $('div.imgdesc').each((i, e) => {
                    img = $(e).find('img').attr('src');
                    synopsis = $(e).find('p').text();
                });
                $('div.listinfo ul li').each((i, e) => {
                    data.push({ i, text: $(e).text() });
                });
                $('div.episodelist').each((i, e) => {
                    episode = $(e).find('li').length;
                });
                const format = {
                    img: img,
                    title: title,
                    synopsis: synopsis,
                    views: views,
                    japanese: data[0].text.replace('Japanese: ', ''),
                    category: data[1].text.replace('Jenis: ', ''),
                    episode: episode,
                    status: data[3].text.replace('Status: ', ''),
                    aired: data[4].text.replace('Tayang: ', ''),
                    producers: data[5].text.replace('Produser: ', ''),
                    genre: data[6].text.replace('Genres: ', ''),
                    duration: data[7].text.replace('Durasi: ', ''),
                    score: Number(data[8].text.replace('Skor: ', ''))
                };
                return format;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
});
exports.get = get;
const random = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.get(`${baseUrl}random`, header);
        return yield (0, exports.get)(res.request._redirectable._currentUrl);
    }
    catch (err) {
        console.error(err);
    }
});
exports.random = random;
//# sourceMappingURL=NekoBocc.js.map