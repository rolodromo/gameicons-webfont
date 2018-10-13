
# RPG Game Icons font

This repo is used to create a webfont based on [Game Icons.net](https://game-icons.net/). All credits goes to them. 

## Install

```sh
 $>  npm install @rolodromo/gameicons-webfont
```

## Versions

- **v1.2** (2018-05-03) 
  - 3322 icons included
  - generated with fontello.com

- **v1.0.1**: First usable version


## Usage

- Download a zip with SVGs from GameIcons
- Move all icons to same folder (`cd all_icons; find icons -mindepth 2  -type f -exec mv  -- {} . \;`)
- Upload `config.json` to [Fontello.com](https://fontello.com)
- run `diff` to get new icons
- Upload new icons
- Download the font
- tweak the css
- make the html sample
- npm publish


## TODO

- Automate more with fontello-cli or similar
