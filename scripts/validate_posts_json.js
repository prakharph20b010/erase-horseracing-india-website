const fs = require('fs')
const p = 'd:/Cystar Lab/Horse/data/posts.json'
try{
  const s = fs.readFileSync(p,'utf8')
  JSON.parse(s)
  console.log('OK')
}catch(e){
  console.error('ERROR', e.message)
  process.exit(1)
}