<template>
  <div id='app'>
    <v-app id='inspire'>

      <v-toolbar app>
        <v-toolbar-title>@rolodromo/gameicons-webfont</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon flat
               href='https://github.com/rolodromo/gameicons-webfont/'
               target='_blank'
        >
          <icon name='github'></icon>
        </v-btn>
        <v-btn icon flat @click='showInfo=true'>
          <v-icon>info</v-icon>
        </v-btn>
      </v-toolbar>

      <v-content>

        <v-dialog
          fullscreen
          hide-overlay
          transition='dialog-bottom-transition'
          v-model='showInfo'
        >
          <info-dialog @close='showInfo=false'/>
        </v-dialog>
        <a id='top'></a>
        <v-container fluid style='min-width: 350px;' v-scroll='onScroll'>
          <v-layout row wrap align-center text-xs-center>

            <v-flex xs12 pa-1>
              <v-select
                :prepend-icon='openAll ? "unfold_less" : "unfold_more"'
                @click:prepend='openAll = !openAll'
                :items='categories'
                label='Categories'
                v-model='selectedCategories'
                clearable
                chips
                deletable-chips
                multiple
              ></v-select>
            </v-flex>

            <v-flex xs12 pa-1>
              <v-text-field
                prepend-icon='search'
                label='Search Icons'
                v-model='searchTerm'
                @input='debounceSearch'
                clearable
              ></v-text-field>
            </v-flex>

            <!-- SEARCH RESULT -->
            <v-flex xs12 pb-5 v-if='searching'>
              <v-card>
                <v-card-text v-if='noResult'>No result</v-card-text>
                <v-card-text v-else>
                  <v-container fluid grid-list-lg align-center>
                    <v-layout row wrap>

                      <v-flex xs12 sm6 md4 lg3 class=' pa-0 ma-0'
                              v-for='(icon,idx) in selectedIcons' :key='`${idx}-${icon}`'>
                        <div class=' pa-0 ma-1 box'>
                          <i class='gi listed' :class='`gi-${icon}`'
                             @click='showDetail(icon)'></i>
                          <span>{{ icon }}</span>
                        </div>
                      </v-flex>

                    </v-layout>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-flex>

            <!-- CATEGORIES -->
            <v-flex xs12
                    class='pa-2 ma-0'
                    v-for='category in categories'
                    :key='category'
                    v-show='filteredCategory(category)'
            >
              <v-card width='100%'>
                <v-card-title dark class='amber display-1 text-xs-center'>
                  <span class='mr-2'>{{ category }}</span>
                  <span class='py-0 px-2 counter'>{{ icons[category].length }}</span>

                  <v-spacer></v-spacer>
                  <v-btn big icon @click='toggleCategory(category)'>
                    <v-icon v-if='openedCategories[category]'>unfold_less</v-icon>
                    <v-icon v-else>unfold_more</v-icon>
                  </v-btn>
                </v-card-title>

                <v-slide-y-transition>
                  <v-container fluid grid-list-lg align-center v-show='openedCategories[category]'>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md4 lg3
                              class='pa-0 ma-0'
                              v-for='(icon,idx) in icons[category]'
                              :key='`${idx}-${icon}-${category}`'
                      >
                        <div class=' pa-0 ma-1 box'>
                          <i class='gi listed' :class='`gi-${icon}`'
                             @click='showDetail(icon)'></i>
                          <span>{{ icon }}</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-slide-y-transition>

              </v-card>
            </v-flex>

            <v-fab-transition>
              <v-btn color='red' dark fab fixed bottom right @click='scrollToTop' v-show='showUpBtn'>
                <v-icon>keyboard_arrow_up</v-icon>
              </v-btn>
            </v-fab-transition>

          </v-layout>
        </v-container>


        <v-bottom-sheet inset v-model='detailDialog'>
          <detail-box :v-model='selectedIcon'/>
        </v-bottom-sheet>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import { debounce } from 'lodash'
import { mapActions, mapGetters } from 'vuex'

import InfoDialog from './components/InfoDialog'
import DetailBox from './components/DetailBox'

export default {
  name: 'App',
  components: {
    InfoDialog,
    DetailBox
  },
  data() {
    return {
      searchTerm: '',
      openAll: true,
      openedCategories: {},
      selectedIcons: [],
      selectedCategories: '',
      filterCategories: false,
      offsetTop: 0,
      showInfo: false,
      detailDialog: false,
      selectedIcon: ''
    }
  },
  computed: {
    ...mapGetters(['categories', 'names', 'icons']),
    noResult() {
      return !this.selectedIcons.length && this.searchTerm.length > 0
    },
    searching() {
      return this.searchTerm && this.searchTerm.length
    },
    showUpBtn() {
      return this.offsetTop > 100
    }
  },
  watch: {
    categories(newVal) {
      this.openedCategories = newVal.reduce((obj, cat) => {
        obj[cat] = true
        return obj
      }, {})
    },
    selectedCategories(newVal) {
      this.filterCategories = !!newVal.length
    },
    openAll(newVal) {
      this.openedCategories = Object.keys(this.openedCategories).reduce((obj, cat) => {
        obj[cat] = newVal
        return obj
      }, {})
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    ...mapActions(['loadData', 'selectIcon']),
    debounceSearch: debounce(function(text) {
      try {
        const re = new RegExp(text, 'gi')
        if (!text || text.length < 3) {
          this.selectedIcons = []
          return
        }
        this.selectedIcons = this.names.filter(icon => icon.match(re))
      } catch (e) {
        this.selectedIcons = []
      }
    }, 500),
    showDetail(icon) {
      this.selectIcon(icon)
      this.detailDialog = true
    },
    toggleCategory(cat) {
      this.openedCategories[cat] = !this.openedCategories[cat]
    },
    filteredCategory(cat) {
      return !this.filterCategories || this.selectedCategories.includes(cat)
    },
    onScroll() {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
    },
    scrollToTop() {
      this.$vuetify.goTo('#top', { offset: -200 })
    }
  }
}
</script>
<style scoped>
.box {
  text-align: left;
  font-size: 2.5em;
  margin-right: 4em;
  position: relative;
}

.box span {
  white-space: nowrap;
  border-radius: 2em;
  font-size: 0.5em;
  line-height: 3.5em;
  padding: 0.5em;
}

.listed {
  background-color: #e4e2ff;
  border-radius: 50%;
  font-size: 1.4em;
  padding: 0.3em;
  margin-left: 0;
}

.counter {
  background-color: #ffa000;
  border-radius: 3em;
  font-size: 0.4em;
  font-weight: bold;
  color: #000;
  height: 2.1em;
  line-height: 2em;
}

.gi {
  width: auto !important;
}

.fa-icon {
  width: auto;
  height: 1.75em;
}
</style>
