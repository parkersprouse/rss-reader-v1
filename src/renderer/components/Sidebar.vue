<template>
  <div class='sidebar-inner'>
    <div>
      <div>
        <el-input placeholder='Feed URL' v-model='new_feed' style='margin-bottom: 0.5rem;'></el-input>
        <el-button @click='submitNewFeed' class='fullwidth' type='dark'>
          <span class='fas fa-plus'></span> Add
        </el-button>
      </div>
      <hr class='separator-horizonal' />
      <div>
        <el-button @click='refreshFeeds' class='fullwidth' type='dark'>
          <span class='fas fa-sync-alt'></span> Refresh Feeds
        </el-button>
      </div>
    </div>
    <div>
      <el-button @click='openSettingsPanel' class='fullwidth' type='dark'>
        <span class='fas fa-cog'></span> Settings
      </el-button>
    </div>
  </div>
</template>

<script>
  import SettingsPanel from '@/components/SettingsPanel';
  import db from '@/lib/db';

  export default {
    name: 'rss-sidebar',
    data() {
      return {
        new_feed: '',
      };
    },
    methods: {
      openSettingsPanel() {
        this.$modal.show(
          SettingsPanel,
          null,
          {
            clickToClose: true,
            height: 'auto',
            id: 'settings-panel',
            name: 'settings-panel',
            scrollable: false,
          },
        );
      },
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
