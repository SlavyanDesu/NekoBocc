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
async function update() {
    const res = await nekopoi.latest()
    console.log(res)
}

// Get hentai episode metadata
async function getHentaiEpisode(url) {
    const res = await nekopoi.getHentaiEpisode(url)
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

update()
/*
 Expected output:
 {
   "result": [
       {
           "img": string,
           "title": string,
           "link": string[]
       }
   ]
 }
*/

getHentaiEpisode('https://nekopoi.care/xxx-xxx-episode-1')
/*
 Expected output:
 {
   "result": {
       "img": string,
       "title": string,
       "synopsis": string,
       "genre": string,
       "producers": string,
       "duration": string,
       "quality": string[],
       "link": string[]
   }
 }
*/

search('shoujo ramune')
/*
 Expected output:
 {
   "result": [
       {
           "img": string,
           "title": string,
           "link": string[]
       }
   ]
 }
*/

getHentai('https://nekopoi.care/hentai/xxxxxx')
/*
 Expected output:
 {
    "result": {
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
 }
*/

random()
/*
 Expected output:
 {
    "result": {
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
 }
*/
```
