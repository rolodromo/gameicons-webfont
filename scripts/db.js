const path = require('path')
const low = require('lowdb')

const FileAsync = require('lowdb/adapters/FileAsync')

let DB

module.exports = async () => {
  if (DB) return DB

  DB = await low(new FileAsync(path.join(__dirname, `../icons.json`)))
  DB.defaults({
    names: [],
    categories: [],
    icons: [],
    iconsByCategory: {}
  })
  await DB.read()
  return DB
}
