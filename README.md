<div align="center">
  <a href="https://ibb.co/ryjz6zL">
    <img src="https://i.ibb.co/s3fNwND/20230115-133928.jpg" alt="20230115-133928" border="0">
  </a>
  <br>
  <p>A simple and lightweight NekoPoi scraper.</p>
  <a href="https://badge.fury.io/js/nekobocc">
    <img src="https://badge.fury.io/js/nekobocc.svg" alt="NPM Version">
  </a>
  <a href="https://packagephobia.com/result?p=nekobocc">
    <img src="https://packagephobia.com/badge?p=nekobocc" alt="Package Size">
  </a>
  <br>
  <a href="https://www.codefactor.io/repository/github/slavyandesu/nekobocc">
    <img src="https://www.codefactor.io/repository/github/slavyandesu/nekobocc/badge" alt="CodeFactor">
  </a>
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2FNekoBocc?ref=badge_shield">
    <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2FNekoBocc.svg?type=shield" alt="FOSSA Status">
  </a>
</div>

---

## Installation
```bash
npm install nekobocc
```

## Loading and Configuring the Module
As of v1.3.x, this module supports both ESM and CommonJS.

### ES Modules (ESM)
```js
import NekoBocc from "nekobocc";
const nekobocc = new NekoBocc();
```

### CommonJS
```js
const NekoBocc = require("nekobocc").default;
const nekobocc = new NekoBocc();
```

## Example
```js
import NekoBocc from "nekobocc";
const nekobocc = new NekoBocc();

// Get a list of released hentai.
nekobocc.release()
  .then((res) => console.log(res));
```

## Results
### HentaiRelease
```js
[
  {
    img: 'https://nekopoi.care/wp-content/uploads/2022/02/vlcsnap-2022-02-06-03h46m23s608-300x169.png',
    title: '[4K] Akane wa Tsumare Somerareru Episode 2 Subtitle Indonesia',
    url: 'https://nekopoi.care/akane-wa-tsumare-somerareru-episode-2-subtitle-indonesia/',
    genre: [
      'Ahegao',
      'Armpit',
      ...
    ],
    duration: '16 menit'
  }
]
```
### EpisodeMetadata
```js
{
  img: 'https://nekopoi.care/wp-content/uploads/2022/02/vlcsnap-2022-02-06-03h46m23s608-300x169.png',
  title: '[4K] Akane wa Tsumare Somerareru Episode 2 Subtitle Indonesia – NekoPoi',
  synopsis: 'Akane yang merasa tersanjung dengan...',
  genre: [
    'Ahegao',
    'Armpit',
    ...
  ],
  producer: [ 'Antechinus' ],
  duration: '16 menit',
  size: {
    '360P': '29MB',
    '480P': '44MB',
    '720P': '98MB',
    '1080P': '195MB'
  },
  download: {
    '1080p': [
      'https://linkpoi.me/imQD',
      ...
    ],
    '720p': [
      'https://linkpoi.me/EsYB',
      ...
    ],
    '480p': [
      'https://linkpoi.me/vLjPqWvJ',
      ...
    ],
    '360p': [
      'https://linkpoi.me/SvDBaJ',
      ...
    ]
  }
}
```

### HentaiMetadata
```js
{
  img: 'https://nekopoi.care/wp-content/uploads/2022/01/Akane-wa-Tsumare-Somerareru2-212x300.jpg',
  title: 'Akane wa Tsumare Somerareru – NekoPoi',
  synopsis: 'Akane yang merasa tersanjung dengan...',
  views: 47457,
  japanese: '茜ハ摘マレ染メラレル',
  category: 'Hentai',
  episode: 2,
  status: 'Completed',
  aired: 'Feb 04, 2022',
  producer: [ 'Antechinus' ],
  genre: [
    'Ahegao',
    'Armpit',
    ...
  ],
  duration: '16 min',
  score: 6.89,
  url: [
    'https://nekopoi.care/akane-wa-tsumare-somerareru-episode-1-subtitle-indonesia/',
    'https://nekopoi.care/akane-wa-tsumare-somerareru-episode-2-subtitle-indonesia/'
  ]
}
```

## Methods
### `nekobocc.release([page])`
- `page` (optional) - Page number to be shown. Default is `1`.
- Returns a [`HentaiRelease`](#hentairelease).

### `nekobocc.search(query)`
- `query` (string, required) - Search query.
- Returns a [`HentaiRelease`](#hentairelease).

### `nekobocc.get(url)`
- `url` (string, required) - NekoPoi hentai episode or page URL.
- Returns [`HentaiMetadata`](#hentaimetadata) or [`EpisodeMetadata`](#episodemetadata).

### `nekobocc.random()`
- Retrieves a random hentai.
- Returns [`HentaiMetadata`](#hentaimetadata) or [`EpisodeMetadata`](#episodemetadata).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<div align="center">
  <a href="https://app.fossa.com/projects/git%2Bgithub.com%2FSlavyanDesu%2FNekoBocc?ref=badge_large">
    <img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2FSlavyanDesu%2FNekoBocc.svg?type=large" alt="FOSSA Status">
  </a>
</div>