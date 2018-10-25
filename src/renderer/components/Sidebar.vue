<template>
  <div>
    <el-input placeholder='Feed URL' v-model='new_feed' style='margin-bottom: 0.5rem;'></el-input>
    <el-button style='width: 100%;' type='info' @click='submitNewFeed'>Add</el-button>
  </div>
</template>

<script>
  import db from '@/lib/db';

  export default {
    name: 'rss-sidebar',
    data() {
      return {
        new_feed: '',
      };
    },
    methods: {
      submitNewFeed() {
        if (!this.new_feed) return;

        const feeds = db.get('feeds');
        if (feeds.value().indexOf(this.new_feed) === -1) {
          feeds.push(this.new_feed).write();
          this.new_feed = '';
          this.$root.$emit('newFeedAdded');
        }
      },
    },
  };
</script>
