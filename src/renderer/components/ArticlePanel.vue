<template>
  <div style='height: 100%; overflow: auto;'>
    <div id='article-title'>{{ article.title }}</div>
    <hr />
    <div id='article-date' v-html='formatDate(article.pubdate)'></div>
    <hr />
    <div id='article-summary' v-html='article.summary'></div>
    <hr />
    <div id='article-description' v-html='description'></div>
    <hr />
    <div id='article-comments'><a @click='visit(article.comments)' href='#'>Comments</a></div>
  </div>
</template>

<script>
  import { shell } from 'electron';
  import moment from 'moment';

  export default {
    name: 'article-panel',
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    methods: {
      formatDate(date) {
        const parsed_date = moment(date);
        return `${parsed_date.format('MM/DD/YYYY')} &bull; ${parsed_date.format('hh:mm a')}`;
      },
      visit(link) {
        shell.openExternal(link);
      },
    },
    computed: {
      description() {
        return this.article.description;
      },
    },
  };
</script>
