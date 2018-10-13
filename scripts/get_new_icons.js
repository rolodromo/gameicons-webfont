const { move } = require('fs-extra')
const path = require('path')
const low = require('lowdb')
const { pullAll } = require('lodash')

const FileAsync = require('lowdb/adapters/FileAsync')

const main = async () => {

  const icons = await low(new FileAsync(path.join(__dirname, `../icons.json`)))
  const config = await low(new FileAsync(path.join(__dirname, `../fontello/config.json`)))


  const all = icons.get('names').value()
  const names = config.get('glyphs').map(x => x.css).value()

  const newIcons = pullAll(all, names)

  await Promise.all(newIcons.map(icon => {
    return move(`../all_icons/${icon}.svg`, `../upload/${icon}.svg`)
  }))

  console.log('done')

}

main()
