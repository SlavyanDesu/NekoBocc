<div align="center">
    <h1>Neko<span style="color: #BB2649">Bocc</span></h1>
    <br>
    <p>A simple Nekopoi scraper with small size file.</p>
    <a href="https://opensource.org/licenses/mit-license.php"><img src="https://badges.frapsoft.com/os/mit/mit.svg?v=103"></a>
    <a href="https://www.npmjs.com/package/nekobocc"><img src="https://img.shields.io/npm/v/node-fetch"></a>
    <a href="https://packagephobia.com/result?p=nekobocc"><img src="https://packagephobia.com/badge?p=nekobocc"></a>
    <a href="https://www.codefactor.io/repository/github/indonesiandev/nekobocc"><img src="https://www.codefactor.io/repository/github/indonesiandev/nekobocc/badge"></a>
</div>

---

## Installation
```sh
npm install nekobocc
```

## Loading and configuring the module
As of v1.2.x this module now support both ESM and CommonJS.
### ES Modules (ESM)
```js
import nekobocc from 'nekobocc';
```

### CommonJS
```js
const nekobocc = require('nekobocc');
```

## Example
```js
import nekobocc from 'nekobocc';

// Get latest post 
(async function() {
	console.log(await neko.latest())
})();
```

## Results
- **NekopoiResult**
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
- **NekopoiEpisodeMetadata**
```js
{
    img: 'https://nekopoi.care/wp-content/uploads/2023/01/vlcsnap-2023-01-01-03h58m25s923-300x169.png',
    title: '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia – NekoPoi',
    synopsis: 'Makoto tiba-tiba berpacaran dengan teman masa kecilnya yaitu Kaoru. Makoto ternyata adalah cewek yang mesum yang tiap malam menonton bokep sambil colmek yang ia dapat dari menyelinap di kamar kakaknya. Namun suatu malam di hari pertama Makoto berpacaran, ia tertangkap basah sedang colmek oleh kakaknya. Dengan rasa gatal yang menyengat dan kemampuan kakaknya akan pengetahuan seks, membuat Makoto tidak dapat menahan godaan untuk bermain dengan kakaknya…',
    genre: 'Ahegao, Anal, Big Oppai, Blowjob, Incest, Masturbation, Netorare, Schoolgirl',
    producers: 'T-Rex, Bunny Walker',
    duration: '16 menit',
    quality: [
        '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia [720p]',
        '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia [480p]',
        '[NEW Release] Mako-chan Kaihatsu Nikki Episode 4 Subtitle Indonesia [360p]'
    ],
    link: [
        'https://drop.download/l1xk0tzboojp',
        'https://drop.download/hh3fc2nybs8d',
        'https://drop.download/u5wy5nu4iwqj'
    ]
}
```

- **NekopoiPageMetadata**
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
    producers: 'T-Rex, Bunny Walker',
    genre: 'Ahegao, Anal, Big Oppai, Blowjob, Incest, Masturbation, Netorare, Schoolgirl',
    duration: '16 min',
    score: 7
}
```

## API
**nekobocc.latest()**	
Get latest post from nekopoi.care	
return a `NekopoiResult`	

**nekobocc.search(query)**	
- `query` is a `string` an you need to pass it, otherwise will resulting an error	

Get search result from given `query`	
return a `NekopoiResult`	

**nekobocc.get(url)**	
- `url` is a valid nekopoi.care URL and only accept episode URL and page URL	

Get metadata of hentai/JAV from given URL	
return a `NekopoiEpisodeMetadata` or `NekopoiPageMetadata`	

**nekobocc.random()**	
Get random hentai/JAV	
return a `NekopoiEpisodeMetadata` or `NekopoiPageMetadata`	

## License
[MIT](LICENSE)
