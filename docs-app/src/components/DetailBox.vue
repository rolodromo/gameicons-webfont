<template>
  <v-card style='min-height: 50vh;'>

    <v-card-title>
      <v-spacer></v-spacer>
      <v-btn big
             v-clipboard:copy='selectedCode'
             v-clipboard:success='onCopy'
      >
        <v-icon>bookmarks</v-icon>
        copy
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-container fill-height>
        <v-layout>
          <v-flex xs12 class='text-xs-center'>
            <i class='gi gi-12x' :class='`gi-${selectedIcon}`'/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-text class='text-xs-center'>
      <code class='title pa-3 mb-3'>&lt;i class="gi gi-{{selectedIcon}}" /&gt;</code>
    </v-card-text>

    <v-snackbar
      v-model='snackbar'>
      {{ snackbarText }}
      <v-btn
        color='pink'
        flat
        @click='snackbar = false'
      >
        Close
      </v-btn>
    </v-snackbar>

  </v-card>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    name: 'DetailBox',
    data() {
      return {
        selectedCode: '',
        snackbar: false,
        snackbarText: 'Icon copied to clipboard'
      }
    },
    watch: {
      selectedIcon() {
        this.selectedCode = `<i class="gi gi-${this.selectedIcon}" />`
      }
    },
    computed: {
      ...mapState(['selectedIcon'])
    },
    methods: {
      onCopy() {
        this.snackbar = true
      }
    }
  }
</script>
