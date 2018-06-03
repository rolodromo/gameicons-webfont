
module.exports = (content, SIZE) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>RPGen GameIcons</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./style.css"></head>
    <link rel="stylesheet" href="../css/rpgen-gameicons.min.css"></head>
  <body>
    <div class="container header">
      <h1>rpg-gameicons <small>font demo</small></h1>
    </div>
    <div class="container">
      <div class="row">
	${content.map((name, i) => {
          line = `\n      <div class="the-icons span4" title="${name}"><i class="gi ${SIZE} gi-${name}"></i><span>gi-${name}</span></div>`
	  if ((i+1)%3===0) 
	    return `\n${line}\n</div>\n<div class="row">\n`
	  else
	    return line
	  
	}).join('')}
       </div>
    </div>
</body>
</html>
`

