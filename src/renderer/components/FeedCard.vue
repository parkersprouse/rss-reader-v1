<template>
  <el-card class='box-card' v-if='error'>
    <div>
      {{ error }}
    </div>
  </el-card>
  <el-card class='box-card feed-card' v-else-if='feed'>
    <div slot='header'>
      <span>{{ feed.title }}</span>
    </div>
    <div class='feed-body'>
      <div v-for='i in feed.items' :key='i.guid' style='margin-bottom: 2rem;'>
        <a @click='visit(i.link)' href='#'>{{ i.title }}</a>
      </div>
    </div>
  </el-card>
  <el-card class='box-card' v-else>
    <div v-loading='true'></div>
  </el-card>
</template>

<script>
  import { shell } from 'electron'; /* eslint-disable-line */
  import RSS from 'rss-parser';
  import utils from '@/lib/utils';

  const parser = new RSS();

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
      this.fetchFeed();
    },
    methods: {
      async fetchFeed() {
        // const data = await parser.parseURL(this.src);
        // this.feed = data;
        const [err, data] = await utils.call(parser.parseURL(this.src));
        if (err) {
          this.error = 'Unable to fetch feed';
          return;
        }
        console.log(data);
        this.feed = data;
      },
      visit(link) {
        shell.openExternal(link);
      },
    },
  };
</script>
