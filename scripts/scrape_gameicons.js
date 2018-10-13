const { reduce, sortBy, uniqBy } = require('lodash')
const { basename } = require('path')
const osmosis = require('osmosis')

const getDb = require('./db')

const data = {
  categories: new Set([]),
  names: new Set([]),
  icons: []
}

osmosis
  .get('http://game-icons.net/tags.html')
  .find('ul.tags li')
  .follow('a@href')
  .find('h1#tag-name')
  .set('category')
  .find('ul.icons li')
  .set({
    icon: 'a img@src'
  })
  .data(line => {
    const category = line.category.replace(/^[0-9]+ /, '').replace(/ icons/, '').toLowerCase()
    const icon = basename(line.icon, '.svg')
    data.categories.add(category)
    data.names.add(icon)
    data.icons.push({ name: icon, category })
  })
  .done(async () => {
    const db = await getDb()

    const icons = sortBy(uniqBy(data.icons, 'name'), 'name')

    const grouped = reduce(sortBy(icons, 'category'), (grouped, icon) => {
      grouped[icon.category] = grouped[icon.category] || []
      grouped[icon.category].push(icon.name)
      grouped[icon.category].sort()
      return grouped
    }, {})

    await db.set('names', Array.from(data.names).sort()).write()
    await db.set('categories', Array.from(data.categories).sort()).write()
    await db.set('icons', icons).write()
    await db.set('iconsByCategory', grouped).write()

    const count = db.get('names').size().value()
    const categories = db.get('categories').size().value()

    console.log(`Loaded ${count} icons in ${categories} categories`)
  })

