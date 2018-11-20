<template>
  <div>
    <el-card class='box-card feed-card' v-if='error'>
      <div slot='header' class='feed-header' @contextmenu.prevent.stop='$refs.feed_header_menu.open'>
        <div class='feed-card-title'>Error</div>
      </div>
      <div class='feed-body'>
        <div style='margin-bottom: 2rem;'>
          <div style='font-weight: bold; margin-bottom: 1rem;'>Unable to parse feed</div>
          <div>{{ error }}</div>
        </div>
      </div>
    </el-card>
    <el-card class='box-card feed-card' v-else-if='feed'>
      <div slot='header' class='feed-header' @contextmenu.prevent.stop='$refs.feed_header_menu.open'>
        <div class='feed-card-title' :title='feed.title'>{{ feed.title }}</div>
      </div>
      <div class='feed-body'>
        <div v-for='i in feed.items' :key='i.created'>
          <a @click='showDetails(i)' @contextmenu.prevent.stop='visit(i.link)' href='#'>
            <img v-if='i.enclosures && i.enclosures.length > 0 && isImage(i.enclosures[0].url)' :src='i.enclosures[0].url' />
            <div id='feed-title'>{{ i.title }}</div>
            <div id='feed-date' v-html='formatDate(i.pubdate)'></div>
          </a>
        </div>
      </div>
    </el-card>
    <el-card class='box-card feed-card' v-else>
      <div v-loading='true'></div>
    </el-card>

    <vue-context ref='feed_header_menu'>
      <ul>
        <li @click='showConfirmDelete'>Hide Feed Entries</li>
        <li @click='showConfirmDelete'>Delete Feed</li>
      </ul>
    </vue-context>
  </div>
</template>

<script>
  import { shell } from 'electron';
  import _ from 'lodash';
  import moment from 'moment';
  import { VueContext } from 'vue-context';
  import db from '@/lib/db';
  import parse from '@/lib/feedparser/feedparser-promised';
  import utils from '@/lib/utils';
  import ArticlePanel from '@/components/ArticlePanel.vue';

  export default {
    name: 'main-container',
    components: {
      'vue-context': VueContext,
    },
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
        const parsed_date = moment(date);
        return `${parsed_date.format('MM/DD/YYYY')} &sdot; ${parsed_date.format('hh:mm a')}`;
      },
      refreshFeed() {
        parse(this.src)
          .then((feed) => {
            const new_feed = { ...feed };
            new_feed.items = _.sortBy(feed.items, ['pubdate']).reverse();
            this.feed = feed;
          })
          .catch((err) => {
            this.error = err.message;
          });
      },
      showConfirmDelete() {
        this.$modal.show({
          template: `
            <div>
              <h2>Are you sure you want to delete the<br/>"{{ feedName }}" feed?</h2>
              <div class='btn-container'>
                <el-button @click='() => { this.deleteFeed(); $emit("close"); }' type='danger'>Yes</el-button>
                <el-button @click='$emit("close")' type='dark'>No</el-button>
              </div>
            </div>
          `,
          props: ['deleteFeed', 'feedName'],
        },
        { deleteFeed: this.deleteFeed, feedName: this.feed.title },
        {
          clickToClose: true,
          height: 'auto',
          id: 'confirm-delete-feed-dialog',
          name: 'confirm-delete-feed-dialog',
          scrollable: false,
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
