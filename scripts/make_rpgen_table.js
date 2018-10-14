
const getDb = require('./db')

const main = async () => {
  let header = `
;gi-icon
[gi-all]

;gi-size
gi-2x

;gi-all
`
  let html = ''
  let nameTables = ''

  const db = await getDb()
  const list = db.get('iconsByCategory').value()

  Object.keys(list).map(key => {

    header += `[${key}]\n`
    html += `\n;${key}\n<i class="gi [gi-${key}-names] [gi-size]"></i>\n`

    const names = list[key]

    nameTables += `\n;gi-${key}-names\n`

    names.forEach(name => {
      nameTables += `gi-${name}\n`
    })
  })

  console.log(`${header}${html}\n${nameTables}`)

}
main()
