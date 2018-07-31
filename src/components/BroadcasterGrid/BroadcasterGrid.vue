<template>
  <div class="broadcaster-grid-wrapper">
    <header v-if="actualTags">
      <h3>
        {{actualTags}}
      </h3>
      <h6>
        The quick brown fox jumps over the lazy dog
      </h6>
    </header>
    <h3 v-if="!items.length && actualTags">
      There are no brodcasters tagged "{{actualTags}}".
    </h3>
    <div class="broadcaster-grid" :class="{hidden:!items.length}">
      <div class="broadcaster-grid-inner">
        <broadcaster-grid-item :item="item" :index="index" v-for="(item, index) in items" :key="item.slug" v-on:loadTag="loadBroadcasters"></broadcaster-grid-item>
      </div>

      <div class="scroller scroller-left" :class="{hidden: leftHidden}">
        <a href="#" @click.prevent @mouseover="startScroll('scrollLeft')" @mouseout="clearScroll()">
          <icon name="angle-left" scale="4"></icon>
        </a>
      </div>

      <div class="scroller scroller-right" :class="{hidden: rightHidden}">
        <a href="#" @click.prevent @mouseover="startScroll('scrollRight')" @mouseout="clearScroll()">
          <icon name="angle-right" scale="4"></icon>
        </a>
      </div>

    </div>
  </div>
</template>
<script>
  import BroadcasterGridItem from './BroadcasterGridItem.vue'
  import Vue from 'vue'
  export default {
    components: {
      BroadcasterGridItem
    },
    props: ['tags'],
    computed: {
      actualTags () {
        return this.localTags || this.tags
      },
      leftHidden () {
        return this.scroll === 0
      },
      rightHidden () {
        return this.scroll < this.containerWidth
      }
    },
    data () {
      return {
        container: null,
        containerWidth: 0,
        scrollInterval: null,
        scroll: 0,
        itemsMap: {},
        items: [],
        limit: 10,
        localTags: null,
        offset: null,
        page: 1,
        pages: null,
        total: null
      }
    },
    sockets: {
      showChange (shows) {
        for (let s in shows) {
          let show = shows[s]
          let index = this.getIndexBySlug(show.slug)
          if (index !== false) {
            Vue.set(this.items, index, show)
          }
        }
      },
      updateTags (tags) {
        let index = this.getIndexBySlug(tags.slug)
        if (index !== false) {
          Vue.set(this.items[index], 'tags', tags.tags)
        }
      },
      updateTopic (topic) {
        let index = this.getIndexBySlug(topic.slug)
        if (index !== false) {
          Vue.set(this.items[index], 'topic', topic.topic)
        }
      }
    },
    methods: {
      getIndexBySlug (slug) {
        if (this.itemsMap[slug] || this.itemsMap[slug] === 0) {
          return this.itemsMap[slug]
        } else {
          return false
        }
      },
      getElementPosition (ele) {
        return Number(ele.style.left.replace('px', ''))
      },
      moveElement (ele, amount) {
        return (this.getElementPosition(ele) + amount) + 'px'
      },
      clearScroll () {
        clearInterval(this.scrollInterval)
      },
      startScroll (direction) {
        if (this[direction]) this.scrollInterval = setInterval(this[direction], 10)
      },
      updateScroll (amount) {
        this.scroll += amount
      },
      scrollLeft () {
        let amount = 10
        let pos = this.getElementPosition(this.container)
        if (pos < 0) {
          this.updateScroll(amount)
          this.container.style.left = this.moveElement(this.container, amount)
        }
      },
      scrollRight () {
        let amount = -10
        let pos = this.getElementPosition(this.container)
        if (pos > this.containerWidth) {
          this.updateScroll(amount)
          this.container.style.left = this.moveElement(this.container, amount)
        }
      },
      setData (list, tags) {
        this.items = list.online.docs.concat((list.offline && list.offline.docs) || [])
        this.limit = list.online.limit
        this.offset = list.online.offset
        this.page = list.online.page
        this.pages = list.online.pages
        this.total = list.online.total

        this.itemsMap = []
        if (list.online.docs && list.online.docs.length) {
          for (let i = 0; i < list.online.docs.length; i++) {
            this.itemsMap[list.online.docs[i].slug] = i
          }
        }
        if (list.offline && list.offline.docs && list.offline.docs.length) {
          for (let i = 0; i < list.offline.docs.length; i++) {
            this.itemsMap[list.offline.docs[i].slug] = i
          }
        }

        let cellWidth = 250
        let margin = 10
        let totalCell = cellWidth + margin
        let elWidth = totalCell * this.items.length
        this.containerWidth = 0 - elWidth + this.$el.offsetWidth - 50
      },
      loadBroadcasters (tags = this.tags) {
        this.localTags = tags
        this.$socket.emit('broadcasterlist', {tags}, this.setData)
      }
    },
    mounted () {
      this.container = this.$el.querySelector('.broadcaster-grid-inner')
      this.loadBroadcasters()
    }
  }
</script>
<style>
  .hidden {
    display: none;
  }
  .broadcaster-grid {
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .broadcaster-grid-wrapper {
    border-bottom: 3px solid #CA907E;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  .broadcaster-grid-wrapper:last-child {
    border: none;
  }

  .broadcaster-grid-wrapper header {
    display: flex;
    align-items: center;
  }

  .broadcaster-grid-wrapper h6 {
    padding-left: 20px;
  }

  .broadcaster-grid-inner {
    font-size: 0;
    height: 160px;
    margin: 15px 0;
    padding-bottom: 10px;
    position: relative;
    white-space: nowrap;
  }

  .scroller {
    background: rgba(0,0,0,.3);
    display: none;
    height: 100%;
    position: absolute;
    text-align: center;
    top: 0;
    width: 50px;
  }

  .broadcaster-grid:hover .scroller {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .broadcaster-grid:hover .scroller.hidden {
    display: none
  }

  .scroller a {
    color: #fff;
    font-weight: bold;
  }

  .scroller-left {
    left: 0;
  }

  .scroller-right {
    right: 0;
  }

</style>
