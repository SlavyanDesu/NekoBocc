const nekobocc = require('../lib/NekoBocc')

async function update() {
    console.log(await nekobocc.latest())
}

update()