<template>
  <v-card>
    <v-toolbar card prominent>
      <v-toolbar-title class="body-2">Info</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click='$emit("close")'>
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>

      <div class='title pb-2'>Setup</div>
      <v-divider></v-divider>
      <v-card flat transparent>
        <v-card-text>
          Add the link to the head tag like this:
          <v-spacer class='pb-3'></v-spacer>
          <code v-html='head'></code>
        </v-card-text>
      </v-card>

      <div class='title pb-2'>Usage</div>
      <v-divider></v-divider>
      <v-card flat transparent>
        <v-card-text>
          Once you have the font installed on your site. Using it is as simple as a using the <strong>&lt;i&gt;</strong>
          tag.
          <v-spacer class='pb-3'></v-spacer>
          <i class='gi gi-swordwoman example'></i> <code v-html='example1'></code>
        </v-card-text>
      </v-card>

      <v-card flat transparent>
        <v-card-text>
          You can also color with CSS styles
          <v-spacer class='pb-3'></v-spacer>
          <i class='gi gi-swordwoman example' style='color: #F00;'></i> <code v-html='example2'></code>
        </v-card-text>
      </v-card>

      <div class='title pb-2'>Examples</div>
      <v-divider></v-divider>
      <v-card flat transparent>
        <v-card-text>
          You can use the pre-made modifiers for size: <code>gi-2x</code> to <code>gi-12x</code>
          <v-spacer class='pb-3'></v-spacer>
          <v-list>
            <v-list-tile>
                 <span class='box pb-2'>
                  <i class='gi gi-swordwoman'></i>
                </span>
              <code v-html='exampleSize'></code>
            </v-list-tile>

            <v-list-tile>
                <span class='box pb-2'>
                  <i class='gi gi-swordwoman gi-2x'></i>
                </span>
              <code v-html='exampleSize2'></code>
            </v-list-tile>

            <v-list-tile>
                <span class='box pb-2'>
                  <i class='gi gi-swordwoman gi-4x'></i>
                </span>
              <code v-html='exampleSize4'></code>
            </v-list-tile>

          </v-list>
        </v-card-text>
      </v-card>

    </v-card-text>
  </v-card>
</template>
<script>
  import { escape } from 'lodash'

  const head = escape(`<head>
  <link href="https://unpkg.com/@rolodromo/gameicons-webfont/css/rpgen-gameicons.min.css" rel="stylesheet" />
</head>`)

  const example1 = escape(`<i class="gi gi-swordwoman"></i>`)
  const example2 = escape(`<i class="gi gi-swordwoman" style="color: #F00;"></i>`)
  const exampleSize = escape(`<i class="gi gi-swordwoman"></i>`)
  const exampleSize2 = escape(`<i class="gi gi-swordwoman gi-2x"></i>`)
  const exampleSize4 = escape(`<i class="gi gi-swordwoman gi-4x"></i>`)

  export default {
    name: 'InfoDialog',
    created() {
      console.log('created')
    },
    data() {
      return {
        head,
        example1,
        example2,
        exampleSize,
        exampleSize2,
        exampleSize4
      }
    }
  }
</script>
<style scoped>
  .example {
    font-size: 3em;
  }

  .box {
    width: 150px;
    position: relative;
    user-select: auto !important;
  }

  .box i {
    position: absolute;
    right: 0 !important;
    user-select: auto !important;
  }
</style>
