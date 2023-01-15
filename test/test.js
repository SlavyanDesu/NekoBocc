import * as neko from '../dist/esm/NekoBocc.js'

async function latest() {
	const result = await neko.latest()
  console.log(result)
}

async function search(query) {
	const result = await neko.search(query)
	console.log(result)
}

async function get(url) {
	const result = await neko.get(url)
	console.log(result)
}

async function random() {
	const result = await neko.random()
	console.log(result)
}

get('https://nekopoi.care/hentai/mako-chan-kaihatsu-nikki/')