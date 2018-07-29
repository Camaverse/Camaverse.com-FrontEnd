<template>
  <div class="broadcaster-grid-item">
      <div class="broadcaster-thumb-container" :class="{isOffline: !item.show}">
        <img class="broadcaster-thumb" :src="item.images.broadcasterGrid" alt="" v-if="loadImgs" />
      </div>
      <div class="broadcaster-name">
        <small>
          <sub>
            <span v-if="!item.isAway">{{item.status}}</span>
            <span v-else>Away</span>
          </sub>
        </small>
        <br>
        {{item.username}}
      </div>
      <div class="broadcaster-details inner">
        <div class="broadcaster-info">
          <h3 class="broadcaster-username">
            <router-link :to="'/watch/' + item.slug">
              {{item.username}}
            </router-link>
          </h3>
          <p class="broadcaster-quote">
            <abbr :title="item.topic">{{item.topic}}</abbr>
          </p>
          <broadcaster-tag-list :tags="item.tags" v-on:loadTag="loadTag"></broadcaster-tag-list>
        </div>
      </div>
      <div class="broadcaster-details outer">
        <p class="broadcaster-quote">{{item.topic}}</p>
        <broadcaster-tag-list :tags="item.tags" v-on:loadTag="loadTag"></broadcaster-tag-list>
      </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BroadcasterTagList from './BroadcasterTagList.vue'
  export default {
    computed: {
      ...mapState({
        loadImgs: state => state.dev.loadImgs
      })
    },
    components: { BroadcasterTagList },
    filters: {
      pretty: function (value) {
        return JSON.stringify(value, null, 2)
      }
    },
    methods: {
      loadTag (tag) {
        this.$emit('loadTag', tag)
      }
    },
    props: ['item', 'index']
  }
</script>
<style>
  .broadcaster-grid-item {
    position: relative;
    display: inline-block;
    width: 250px;
    height: 140.625px;
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
    -webkit-transition: 450ms all;
    transition: 450ms all;
    -webkit-transform-origin: center left;
    transform-origin: center left;
  }

  .broadcaster-grid-item:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .broadcaster-details.inner {
    overflow: hidden;
  }

  .status-offline:before  {
    background: rgba(0,0,0, 0.6);
  }

  .status-private:before {
    background: rgba(255,0,0, 0.3);
  }

  .status-vip:before {
    background: rgba(255, 224, 0, 0.3);
  }

  .status-away:before {
    background: rgba(122, 19, 255, 0.3);
  }

  .status-vip:hover:before { background: none; }

  .broadcaster-tags{
    margin: 0;
    font-size: .75em;
  }
  .broadcaster-quote {
    margin: 0;
    overflow: hidden;
  }

  .broadcaster-name {
    bottom: 5px;
    left: 5px;
    position: absolute;
    color: #fff;
    font-weight: bold;
    opacity: 1;
    -webkit-transition: 450ms opacity;
    transition: 450ms opacity;
  }

  .broadcaster-grid-item:hover .broadcaster-name {
    opacity: 0;
  }

  .broadcaster-username {
    margin: 0;
  }
  .broadcaster-username a{
    color: #000;
  }

  .broadcaster-tag {
    padding-right: 10px;
  }

  .broadcaster-thumb-container,
  .broadcaster-thumb {
    width: 250px;
    height: 140.625px;
    -o-object-fit: cover;
    object-fit: cover;
    background: #000;
  }

  .isOffline .broadcaster-thumb{
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  .broadcaster-grid-item:hover .broadcaster-thumb-container,
  .broadcaster-grid-item:hover .broadcaster-thumb {
    background: #fff;
  }

  .broadcaster-details.inner {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    font-size: 10px;
    opacity: 0;
    background: -webkit-linear-gradient(bottom, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%);
    background: linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%);
    -webkit-transition: 450ms opacity;
    transition: 450ms opacity;
  }

  .broadcaster-grid-item:hover .broadcaster-details.inner {
    opacity: 1;
  }

  .broadcaster-details.outer {
    font-size: 10px;
    opacity: 1;
    -webkit-transition: 450ms opacity;
    transition: 450ms opacity;
  }

  .broadcaster-grid-item:hover .broadcaster-details.outer {
    opacity: 0;
  }

  .broadcaster-info {
    position: absolute;
    bottom: 0;
    padding: 10px;
  }

  .broadcaster-grid-item:hover ~ .broadcaster-grid-item {
    -webkit-transform: translate3d(125px, 0, 0);
    transform: translate3d(125px, 0, 0);
  }

  .broadcaster-grid-inner:hover .broadcaster-grid-item:hover {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
    opacity: 1;
  }

  .pretty {
    font-size: 10px;
    overflow: auto;
    width: 250px;
  }

</style>
