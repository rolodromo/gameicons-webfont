
const data = require('./icons')

let header = `
;gi-icon
[gi-all]

;gi-size
gi-4x

;gi-all
`
let html = ''
let nameTables = ''

Object.keys(data.icons).map(key => {

  header += `[${key}]\n`
  html += `\n;${key}\n<i class="gi [gi-${key}-names] [gi-size]"></i>\n`

  const names = data.icons[key]

  nameTables += `\n;gi-${key}-names\n`

  names.forEach(name => {
    nameTables += `gi-${name}\n`
  })
})

console.log(`${header}${html}\n${nameTables}`)
