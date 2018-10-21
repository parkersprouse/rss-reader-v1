<template>
  <el-card class='box-card' v-if='error'>
    <div>
      {{ error }}
    </div>
  </el-card>
  <el-card class='box-card feed-card' v-else-if='feed'>
    <div slot='header' class='feed-header'>
      <span>{{ feed.title }}</span>
    </div>
    <div class='feed-body'>
      <div v-for='i in feed.items' :key='i.created' style='margin-bottom: 2rem;'>
        <a @click='visit(i.link)'>
          {{ i.title }}
          <p v-if='i.enclosures'>
            <img :src='i.enclosures[0].url' style='max-width: 100%;' />
          </p>
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
  import RSS from 'rss-to-json';

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
      RSS.load(this.src, (err, rss) => {
        if (!err) {
          this.feed = rss;
          console.log(rss);
        } else {
          this.error = 'Unable to fetch feed';
        }
      });
    },
    methods: {
      visit(link) {
        shell.openExternal(link);
      },
    },
  };
</script>
