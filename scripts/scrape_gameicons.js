var osmosis = require('osmosis');

const data = {
  categories: new Set([]),
  names: new Set([]),
  icons: {},
}

osmosis
  .get('http://game-icons.net/tags.html')
  .find('ul.tags li')
  .follow('a@href')
  .find('h1#tag-name')
  .set('category')
  .find('ul.icons li')
  .set({
    icon: 'a img@alt'
  })
  .data(line => {
    const category = line.category.replace(/^[0-9]+ /, '').replace(/ icons/, '').toLowerCase()
    const icon = line.icon.replace(' icon', '').toLowerCase().replace(/ +/g, '-')
    data.categories.add(category)
    data.names.add(icon)
    data.icons[category] = data.icons[category] || []
    data.icons[category].push(icon)
  })
  .done(() => {
    data.categories = Array.from(data.categories).sort()
    data.names = Array.from(data.names).sort()
    console.log(JSON.stringify(data, null, 2))
  })

