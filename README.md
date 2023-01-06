# NekoBocc
Nekopoi unofficial API.

## Installation
```bash
> npm install nekobocc
```

## Usage
```js
// Import the package
const nekopoi = require('nekobocc')

// Get latest update
async function latest() {
    const res = await nekopoi.latest()
    console.log(res)
}

// Search through Nekopoi
async function search(query) {
    const res = await nekopoi.search(query)
    console.log(res)
}

// Get hentai metadata
async function getHentai(url) {
    const res = await nekopoi.getHentai(url)
    console.log(res)
}

// Get random hentai
async function random() {
    const res = await nekopoi.random()
    console.log(res)
}

latest()
/*
 Expected output:
 [
    {
        img: string,
        title: string,
        link: string
    }
 ]
*/

search('shoujo ramune')
/*
 Expected output:
 [
    {
        img: string,
        title: string,
        link: string
    }
 ]
*/

// If you put episode link instead of hentai, you will get below result.
getHentai('https://nekopoi.care/xxxx-episode-x-xxxx')
/*
 Expected output:
 {
    img: string,
    title: string,
    synopsis: string,
    genre: string,
    producers: string,
    duration: string,
    quality: string[]
    link: string[]
 }
*/

getHentai('https://nekopoi.care/hentai/xxxxxx')
/*
 Expected output:
 {
    img: string,
    title: string,
    synopsis: string,
    views: number,
    japanese: string,
    category: string,
    episode: number,
    status: string,
    aired: string,
    producers: string,
    genre: string,
    duration: string,
    score: number
 }
*/

random()
/*
 Expected output:
 {
    img: string,
    title: string,
    synopsis: string,
    views: number,
    japanese: string,
    category: string,
    episode: number,
    status: string,
    aired: string,
    producers: string,
    genre: string,
    duration: string,
    score: number
 }
*/