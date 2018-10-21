<template>
  <div v-if='feeds'>
    <el-row :gutter='20'>
      <el-col :span='8' v-for='feed in feeds' :key='feed'>
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
    },
  };
</script>
