<template>
  <div class='sidebar-inner'>
    <div>
      <el-input placeholder='Feed URL' v-model='new_feed' style='margin-bottom: 0.5rem;'></el-input>
      <el-button @click='submitNewFeed' icon='el-icon-circle-plus-outline' class='fullwidth' type='dark'>
        Add
      </el-button>
    </div>
    <hr class='separator-horizonal' />
    <div>
      <el-button @click='refreshFeeds' icon='el-icon-refresh' class='fullwidth' type='dark'>
        Refresh Feeds
      </el-button>
    </div>
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
      refreshFeeds() {
        this.$root.$emit('feedsRefreshed');
        this.$message({
          customClass: 'el-message--success',
          duration: 1500,
          iconClass: 'el-icon-check',
          message: 'Feeds Refreshed',
          type: 'success',
        });
      },
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
