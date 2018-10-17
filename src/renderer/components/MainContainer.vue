<template>
  <div>
    main container
  </div>
</template>

<script>
  import RSS from 'rss-parser';
  const parser = new RSS();

  export default {
    name: 'main-container',
    mounted() {
      this.doParse();
    },
    methods: {
      async doParse() {
        const feed = await parser.parseURL('https://www.reddit.com/r/smite/.rss');
        console.log(feed);
      },
    },
  };
</script>
