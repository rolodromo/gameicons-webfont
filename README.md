# RPG Game Icons font

This repo is used to create a webfont based on [Game Icons.net](https://game-icons.net/). All credits goes to them. 

## Install

```sh
 $>  npm install @rolodromo/gameicons-webfont
```

## See the icons

https://rolodromo.github.io/gameicons-webfont/


## Versions

- **v1.4** (2020-10-31) 
  - 3861 icons included
- **v1.3** (2018-10-13) 
  - 3375 icons included
- **v1.2** (2018-05-03) 
  - 3322 icons included
  - generated with fontello.com

- **v1.0.1**: First usable version


## Usage

- Download a zip with SVGs from GameIcons (choose black with transparent background)
- Move all icons to same folder
  - `cd all_icons; find icons -mindepth 2  -type f -exec mv  -- {} . \;`
- Run `npm run new` to get new icons (copy new icons to /upload)
- Drag and drop `config.json` to [Fontello.com](https://fontello.com) 
- Drag&drop from /upload folder to fontello page
- Download the font
  - move downloaded css file to css/rpgen-gameicons.css
  - review and add missing properties to css header (up to where the icon list start)
- make the html sample (npm run html)
- check results opening example.html
- npm publish


## TODO

- Automate more with fontello-cli or similar
