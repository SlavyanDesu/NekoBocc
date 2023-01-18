<div align="center">
    <a href="https://ibb.co/ryjz6zL"><img src="https://i.ibb.co/s3fNwND/20230115-133928.jpg" alt="20230115-133928" border="0"></a>
    <br>
    <p>A simple and lightweight Nekopoi scraper.</p>
    <a href="https://opensource.org/licenses/mit-license.php"><img src="https://badges.frapsoft.com/os/mit/mit.svg?v=103"></a>
    <a href="https://www.npmjs.com/package/nekobocc"><img src="https://img.shields.io/npm/v/node-fetch"></a>
    <a href="https://packagephobia.com/result?p=nekobocc"><img src="https://packagephobia.com/badge?p=nekobocc"></a>
    <br>
    <a href="https://www.codefactor.io/repository/github/indonesiandev/nekobocc"><img src="https://www.codefactor.io/repository/github/indonesiandev/nekobocc/badge"></a>
    <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FIndonesianDev%2FNekoBocc?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FIndonesianDev%2FNekoBocc.svg?type=shield"/></a>
</div>

---

## Installation
```sh
$ npm install nekobocc
```

## Loading and configuring the module
As of v1.3.x this module now support both ESM and CommonJS.

### ES Modules (ESM)
```js
import NekoBocc from 'nekobocc'
const nekobocc = new NekoBocc()
```

### CommonJS
```js
const NekoBocc = require('nekobocc').default
const nekobocc = new NekoBocc()
```

## Example
```js
import NekoBocc from 'nekobocc'
const nekobocc = new NekoBocc()

// Get list of released hentai.
nekobocc.release()
  .then(res => console.log(res))
```

## Results
- **HentaiRelease**
```js
[
    {
        img: 'https://nekopoi.care/wp-content/uploads/2023/01/vlcsnap-2023-01-15-03h18m12s053-300x169.png',
        title: '[L2D] Bocchi-chan Maid Service by Consome',
        link: 'https://nekopoi.care/l2d-bocchi-chan-maid-service-by-consome/'
    },
    {
        img: 'https://nekopoi.care/wp-content/uploads/2023/01/vlcsnap-2023-01-15-00h06m41s977-300x169.png',
        title: '[NEW Release] Kemonokko Tsuushin The Animation Episode 2 Subtitle Indonesia',
        link: 'https://nekopoi.care/kemonokko-tsuushin-the-animation-episode-2-subtitle-indonesia/'
    }
    ...
]
```
- **EpisodeMetadata**
```js
{
    img: 'https://nekopoi.care/wp-content/uploads/2023/01/vlcsnap-2023-01-01-03h58m25s923-300x169.png',
    title: '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia – NekoPoi',
    synopsis: 'Makoto tiba-tiba berpacaran dengan teman masa kecilnya yaitu Kaoru. Makoto ternyata adalah cewek yang mesum yang tiap malam menonton bokep sambil colmek yang ia dapat dari menyelinap di kamar kakaknya. Namun suatu malam di hari pertama Makoto berpacaran, ia tertangkap basah sedang colmek oleh kakaknya. Dengan rasa gatal yang menyengat dan kemampuan kakaknya akan pengetahuan seks, membuat Makoto tidak dapat menahan godaan untuk bermain dengan kakaknya…',
    genre: 'Ahegao, Anal, Big Oppai, Blowjob, Incest, Masturbation, Netorare, Schoolgirl',
    producer: 'T-Rex, Bunny Walker',
    duration: '16 menit',
    quality: [
        '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia [720p]',
        '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia [480p]',
        '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia [360p]'
    ],
    download: [
        'https://drop.download/l1xk0tzboojp',
        'https://drop.download/hh3fc2nybs8d',
        'https://drop.download/u5wy5nu4iwqj'
    ]
}
```

- **HentaiMetadata**
```js
{
    img: 'https://nekopoi.care/wp-content/uploads/2021/07/MakochanKaihatsuNikkiep69538176cde48c8e3ebb65761cb63504-213x300.jpg',
    title: 'Mako-chan Kaihatsu Nikki',
    synopsis: 'Makoto tiba-tiba berpacaran dengan teman masa kecilnya yaitu Kaoru. Makoto ternyata adalah cewek yang mesum yang tiap malam menonton bokep sambil colmek yang ia dapat dari menyelinap di kamar kakaknya. Namun suatu malam di hari pertama Makoto berpacaran, ia tertangkap basah sedang colmek oleh kakaknya. Dengan rasa gatal yang menyengat dan kemampuan kakaknya akan pengetahuan seks, membuat Makoto tidak dapat menahan godaan untuk bermain dengan kakaknya…',
    views: 21035,
    japanese: 'まこちゃん開発日記',
    category: 'Hentai',
    episode: 4,
    status: 'Completed',
    aired: 'Jul 02, 2021',
    producer: 'T-Rex, Bunny Walker',
    genre: 'Ahegao, Anal, Big Oppai, Blowjob, Incest, Masturbation, Netorare, Schoolgirl',
    duration: '16 min',
    score: 7
}
```

## API
**nekobocc.release([page])**
- `page` Page number to be shown. Default is `1`.

Get list of released hentai.
<br>
return a `HentaiRelease`

**nekobocc.search(query)**
- `query` is a `string` and you need to pass it, otherwise will resulting an error.

Get search result from given `query`.  
return a `HentaiRelease`

**nekobocc.get(url)**
- `url` Nekopoi episode or hentai page URL.

Get metadata of episode or hentai page from a valid URL.  
return a `HentaiMetadata` or `EpisodeMetadata`

**nekobocc.random()**  
Get random hentai or episode page.  
return a `HentaiMetadata` or `EpisodeMetadata`

## License
[MIT](LICENSE)  
<div align="center"><a href="https://app.fossa.com/projects/git%2Bgithub.com%2FIndonesianDev%2FNekoBocc?ref=badge_large"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FIndonesianDev%2FNekoBocc.svg?type=large"></a></div>
