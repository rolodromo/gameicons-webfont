const { copy, move } = require('fs-extra')
const path = require('path')
const low = require('lowdb')
const { pullAll } = require('lodash')

const FileAsync = require('lowdb/adapters/FileAsync')

const main = async () => {
  const basePath = path.join(__dirname, `..`)
  const icons = await low(new FileAsync( `${basePath}/icons.json`))
  const config = await low(new FileAsync(`${basePath}/fontello/config.json`))


  const all = icons.get('names').value()
  const names = config.get('glyphs').map(x => x.css).value()

  const newIcons = pullAll(all, names)

  await Promise.all(newIcons.map(icon => {
    return copy(`${basePath}/all_icons/${icon}.svg`, `${basePath}/upload/${icon}.svg`, { overwrite: true})
  }))

  console.log('done')

}

main()
