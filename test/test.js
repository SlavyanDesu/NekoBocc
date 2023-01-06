const nekobocc = require('../lib/NekoBocc')

async function random() {
    const res = await nekobocc.random()
    console.log(res)
}

random()