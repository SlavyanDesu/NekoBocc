const axios = require('axios')
const cheerio = require('cheerio')
const baseUrl = 'https://nekopoi.care/'
const isLink = (url) => url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)) && url.includes('nekopoi.care')

/**
 * Get latest update.
 * @returns {Object}
 */
const latest = () => new Promise((resolve, reject) => {
    axios.get(baseUrl)
        .then((res) => {
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
            const json = {
                "img": img,
                "title": title,
                "link": link
            }
            if (json === undefined) {
                reject('No result.')
            } else {
                resolve(json)
            }
        })
        .catch((err) => reject(err.message))
})

/**
 * Get result from link.
 * @param {String} link 
 * @returns {Object}
 */
const get = (link) => new Promise((resolve, reject) => {
    if (!isLink(link)) return reject('Invalid link! Please provide a valid Nekopoi link.')
    axios.get(link)
        .then((res) => {
            const $ = cheerio.load(res.data)
            const img = $('div.thm').find('img').attr('src') 
            const title = $('title').text().trim()
            const link = []
            const quality = []
            let synopsis = ''
            $('div.contentpost').each((i, e) => {
                $(e).find('div.konten').each((i, e) => {
                    $(e).find('p').each((i, e) => {
                        $(e).find('br').replaceWith('\n')
                        synopsis += `${$(e).text()}\n`
                    })
                })
            })
            $('div.liner').each((i, e) => {
                $(e).find('div.listlink').each((i, e) => {
                    link.push($(e).find('a').attr('href'))
                })
                quality.push($(e).find('div.name').text())
            })
            const json = {
                "img": img,
                "title": title,
                "link": {
                    "quality": quality,
                    "link": link
                },
                "synopsis": synopsis
            }
            if (json === undefined) {
                reject('No result.')
            } else {
                resolve(json)
            }
        })
})

/**
 * 
 * @param {String} query 
 * @returns {Object}
 */
const search = (query) => new Promise((resolve, reject) => {
    const url = `${baseUrl}?s=${encodeURI(query)}`
    console.log(url)
    axios.get(url)
        .then((res) => {
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
            const json = {
                "img": img,
                "title": title,
                "link": link
            }
            if (json === undefined) {
                reject('No result.')
            } else {
                resolve(json)
            }
        })
        .catch((err) => reject(err.message))
})

module.exports = {
    latest,
    get,
    search
}