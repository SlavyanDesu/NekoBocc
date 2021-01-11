# NekoBocc
Simple Nekopoi scraper built in JavaScript.

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

getHentaiEpisode('nekopoi.care/xxx-xxx-episode-1')
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
```
