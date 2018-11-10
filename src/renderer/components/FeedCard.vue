<template>
  <el-card class='box-card feed-card' v-if='error'>
    <div slot='header' class='feed-header'>
      <span>&nbsp;</span>
      <el-button icon='el-icon-close'
                 style='float: right; padding: 3px'
                 type='danger'
                 @click='deleteFeed'></el-button>
    </div>
    <div class='feed-body'>
      <div style='margin-bottom: 2rem;'>
        {{ error }}
      </div>
    </div>
  </el-card>
  <el-card class='box-card feed-card' v-else-if='feed'>
    <div slot='header' class='feed-header'>
      <div class='feed-card-title' :title='feed.title'>{{ feed.title }}</div>
      <el-button icon='el-icon-close'
                 style='float: right; padding: 3px'
                 type='danger'
                 @click='deleteFeed'></el-button>
    </div>
    <div class='feed-body'>
      <div v-for='i in feed.items' :key='i.created'>
        <a @click='showDetails(i)' @contextmenu.prevent='visit(i.link)' href='#'>
          <img v-if='i.enclosures && i.enclosures.length > 0 && isImage(i.enclosures[0].url)' :src='i.enclosures[0].url' />
          <div id='feed-title'>{{ i.title }}</div>
          <div id='feed-date'>{{ formatDate(i.pubdate) }}</div>
        </a>
      </div>
    </div>
  </el-card>
  <el-card class='box-card feed-card' v-else>
    <div v-loading='true'></div>
  </el-card>
</template>

<script>
  import { shell } from 'electron';
  import _ from 'lodash';
  import moment from 'moment';
  import db from '@/lib/db';
  import parse from '@/lib/feedparser/feedparser-promised';
  import utils from '@/lib/utils';
  import ArticlePanel from '@/components/ArticlePanel.vue';

  export default {
    name: 'main-container',
    props: {
      src: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        error: null,
        feed: null,
      };
    },
    mounted() {
      this.refreshFeed();
      this.$root.$on('feedsRefreshed', this.refreshFeed);
    },
    methods: {
      isImage: utils.isImage,
      deleteFeed() {
        const feeds = db.get('feeds');
        feeds.splice(feeds.indexOf(this.src), 1).write();
        this.$root.$emit('feedDeleted');
      },
      formatDate(date) {
        return moment(date).format('MM/DD/YYYY');
      },
      refreshFeed() {
        parse(this.src)
          .then((feed) => {
            const new_feed = { ...feed };
            new_feed.items = _.sortBy(feed.items, ['pubdate']).reverse();
            this.feed = new_feed;
          })
          .catch(() => {
            this.error = 'Unable to parse feed';
          });
      },
      showDetails(article) {
        this.$modal.show(
          ArticlePanel,
          { article },
          {
            clickToClose: true,
            height: '75%',
            id: 'article-panel',
            name: 'article-panel',
            width: '75%',
          },
        );
      },
      visit(link) {
        shell.openExternal(link);
      },
    },
  };
</script>
