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
        <a @click='visit(i.link)' href='#'>
          {{ i.title }}
          <img v-if='i.enclosures && i.enclosures.length > 0' :src='i.enclosures[0].url' />
        </a>
      </div>
    </div>
  </el-card>
  <el-card class='box-card' v-else>
    <div v-loading='true'></div>
  </el-card>
</template>

<script>
  import { shell } from 'electron';
  import _ from 'lodash';
  import db from '@/lib/db';
  import parse from '@/lib/feedparser/feedparser-promised';

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
      deleteFeed() {
        const feeds = db.get('feeds');
        feeds.splice(feeds.indexOf(this.src), 1).write();
        this.$root.$emit('feedDeleted');
      },
      refreshFeed() {
        parse(this.src)
          .then((feed) => {
            const new_feed = { ...feed };
            new_feed.items = _.sortBy(feed.items, ['pubdate']).reverse();
            this.feed = new_feed;
            console.log(feed);
          })
          .catch(() => {
            this.error = 'Unable to parse feed';
          });
      },
      visit(link) {
        shell.openExternal(link);
      },
    },
  };
</script>
