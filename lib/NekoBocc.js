const axios = require('axios')
const cheerio = require('cheerio')
const baseUrl = 'https://nekopoi.care/'
const isLink = (url) => url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)) && url.includes('nekopoi.care')

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

const getHentaiEpisode = async (link) => {
    if (!isLink(link)) return console.log('Invalid link! Please provide a valid Nekopoi link.')
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
                    genre += $(e).next().next().text().replace('Genre :', '').trim() + '\n'
                    producers +=  $(e).next().next().next().next().text().replace('Producers :', '').trim() + '\n'
                    duration += $(e).next().next().next().next().next().text().replace('Duration :', '').trim() + '\n'
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
            genre: genre.substring(0, genre.indexOf('\n')),
            producers: producers.substring(0, producers.indexOf('\n')),
            duration: duration.substring(0, duration.indexOf('\n')),
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

module.exports = {
    latest,
    getHentaiEpisode,
    search
}