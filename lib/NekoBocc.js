const axios = require('axios')
const cheerio = require('cheerio')
const baseUrl = 'https://nekopoi.care/'
const isLink = (url) => url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi)) && url.includes('nekopoi.care')

/**
 * Get latest update.
 */
const latest = async () => {
    try {
        const res = await axios.get(baseUrl)
        const $ = cheerio.load(res.data)
        const img = []
        const title = []
        const link = []
        $('div.eropost').each((i, e) => {
            $(e).find('h2').each((i, e) => {
                title.push($(e).find('a').text().trim())
                link.push($(e).find('a').attr('href'))
            })
            img.push($(e).find('img').attr('src'))
        })
        const format = []
        for (let i = 0; i < title.length; i++) {
            const obj = { img: img[i], title: title[i], link: link[i] }
            format.push(obj)
        }
        const json = {
            "result": format
        }
        return json
    } catch (err) {
        console.error(err)
    }
}

/**
 * Get result from Nekopoi.
 * @param {String} query 
 */
const search = async (query) => {
    if (!query) return console.log('Please provide a search terms.')
    const url = `${baseUrl}?s=${encodeURI(query)}`
    try {
        const res = await axios.get(url)
        const $ = cheerio.load(res.data)
        const img = []
        const title = []
        const link = []
        $('div.top').each((i, e) => {
            $(e).find('h2').each((i, e) => {
                title.push($(e).find('a').text().trim())
                link.push($(e).find('a').attr('href'))
            })
            img.push($(e).find('img').attr('src'))
        })
        const format = []
        for (let i = 0; i < title.length; i++) {
            const obj = { img: img[i], title: title[i], link: link[i] }
            format.push(obj)
        }
        const json = {
            "result": format
        }
        return json
    } catch (err) {
        console.error(err)
    }
}

/**
 * Get hentai episode metadata from URL.
 * @param {String} link 
 */
const getHentaiEpisode = async (link) => {
    if (!isLink(link)) return console.log('Invalid link! Please provide a valid Nekopoi hentai episode link.')
    const res = await axios.get(link)
    try {
        const $ = cheerio.load(res.data)
        const img = $('div.thm').find('img').attr('src')
        const title = $('title').text().trim()
        const link = []
        const quality = []
        let synopsis = ''
        let genre = ''
        let producers = ''
        let duration = ''
        $('div.contentpost').each((i, e) => {
            $(e).find('div.konten').each((i, e) => {
                $(e).find('p').each((i, e) => {
                    synopsis += $(e).next().text().trim() + '\n'
                    genre += $(e).next().next().text().replace('Genre :', '') + '\n'
                    producers +=  $(e).next().next().next().next().text().replace('Producers :', '') + '\n'
                    duration += $(e).next().next().next().next().next().text().replace('Duration :', '') + '\n'
                })
            })
        })
        $('div.liner').each((i, e) => {
            $(e).find('div.listlink').each((i, e) => {
                link.push($(e).find('a').attr('href'))
            })
            quality.push($(e).find('div.name').text().trim())
        })
        const format = {
            img: img,
            title: title,
            synopsis: synopsis.substring(0, synopsis.indexOf('\n')),
            genre: genre.substring(0, genre.indexOf('\n')).trim(),
            producers: producers.substring(0, producers.indexOf('\n')).trim(),
            duration: duration.substring(0, duration.indexOf('\n')).trim(),
            quality: quality,
            link: link
        }
        const json = {
            "result": format
        }
        return json
    } catch (err) {
        console.error(err)
    }
}

/**
 * Get hentai metadata.
 * @param {String} link 
 */
const getHentai = async (link) => {
    if (!isLink(link)) return console.log('Please provide a valid Nekopoi hentai link!')
    const res = await axios.get(link)
    try {
        const $ = cheerio.load(res.data)
        const img = $('div.imgdesc').find('img').attr('src')
        const title = $('div.imgdesc').find('b').text().replace('Sinopsis', '').trim()
        const synopsis = $('div.imgdesc').find('p').text().trim()
        const views = $('div.tabs.tab2').next().text().replace('kali', '').trim()
        let japanese = ''
        let category = ''
        let episode = ''
        let status = ''
        let aired = ''
        let producers = ''
        let genre = ''
        let duration = ''
        let score = ''
        $('div.listinfo').each((i, e) => {
            $(e).find('li').each((i, e) => {
                japanese += $(e).text().replace('Japanese:', '') + '\n'
                category += $(e).next().text().replace('Jenis:', '') + '\n'
                episode += $(e).next().next().text().replace('Episode:', '') + '\n'
                status += $(e).next().next().next().text().replace('Status:', '') + '\n'
                aired += $(e).next().next().next().next().text().replace('Tayang:', '') + '\n'
                producers += $(e).next().next().next().next().next().text().replace('Produser:', '') + '\n'
                genre += $(e).next().next().next().next().next().next().text().replace('Genres:', '') + '\n'
                duration += $(e).next().next().next().next().next().next().next().text().replace('Durasi:', '') + '\n'
                score += $(e).next().next().next().next().next().next().next().next().text().replace('Skor:', '') + '\n'
            })
        })
        const format = {
            img: img,
            title: title,
            synopsis: synopsis,
            views: Number(views),
            japanese: japanese.substring(0, japanese.indexOf('\n')).trim(),
            category: category.substring(0, category.indexOf('\n')).trim(),
            episode: Number(episode.substring(0, episode.indexOf('\n')).trim()),
            status: status.substring(0, status.indexOf('\n')).trim(),
            aired: aired.substring(0, aired.indexOf('\n')).trim(),
            producers: producers.substring(0, producers.indexOf('\n')).trim(),
            genre: genre.substring(0, genre.indexOf('\n')).trim(),
            duration: duration.substring(0, duration.indexOf('\n')).trim(),
            score: Number(score.substring(0, score.indexOf('\n')).trim())
        }
        const json = {
            result: format
        }
        return json
    } catch (err) {
        console.error(err)
    }
}

/**
 * Random hentai.
 */
const random = async () => {
    const random = `${baseUrl}random`
    return await axios.get(random)
        .then(async (res) => {
            const url = res.request._redirectable._currentUrl
            return await getHentai(url)
        })
        .catch((err) => console.error(err))
}

module.exports = {
    latest,
    getHentaiEpisode,
    search,
    getHentai,
    random
}
