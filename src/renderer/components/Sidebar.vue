<template>
  <div>
    <input v-model='new_feed' type='text' />
    <button @click='submitNewFeed'>Submit</button>
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
