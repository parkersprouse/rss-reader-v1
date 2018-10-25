<template>
  <div v-if='feeds' id='feeds-container'>
    <el-row :gutter='20'>
      <el-col :sm='11' :md='8' :lg='6' :xl='4' v-for='feed in feeds' :key='feed'>
        <feed-card :src='feed' />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import db from '@/lib/db';
  import FeedCard from '@/components/FeedCard';

  export default {
    name: 'main-container',
    components: {
      'feed-card': FeedCard,
    },
    data() {
      return {
        feeds: null,
      };
    },
    mounted() {
      this.feeds = db.get('feeds').value();
      this.$root.$on('newFeedAdded', this.updateFeeds);
      this.$root.$on('feedDeleted', this.updateFeeds);
    },
    methods: {
      updateFeeds() {
        this.feeds = db.get('feeds').value();
        this.$forceUpdate(); // We need to refresh the component when we update feeds
      },
    },
  };
</script>
