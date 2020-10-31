const { writeFile } = require('fs-extra')
const data = require('../icons')
const html = require('./example_template')

const SIZE='gi-3x'

// flat map
const icons = Object.keys(data.icons).reduce((icons, key) => icons.concat(data.icons[key]), [])

const sorted = Array.from(new Set(icons)).sort()

 writeFile('example.html', html(sorted, SIZE))

