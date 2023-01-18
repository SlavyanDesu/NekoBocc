/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const NekoBocc = require('../dist/cjs/index.js').default
const nekobocc = new NekoBocc()

nekobocc.release()
  .then(res => console.log(res))