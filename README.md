# NekoBocc
Simple Nekopoi scraper built in JavaScript.
```js
const nekopoi = require('nekobocc')

// Get latest update
async function update() {
    const res = await nekopoi.latest()
    console.log(res)
}

// Get metadata from episode URL
async function get(url) {
    const res = await nekopoi.get(url)
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

get('nekopoi.care/xxx-xxx-episode-1')
/*
 Expected output:
 {
   "result": {
       "img": string,
       "title": string,
       "synopsis": string,
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
