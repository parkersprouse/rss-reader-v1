<template>
  <div>
    <div id='article-title'>{{ article.title }}</div>
    <hr />
    <div id='article-date' v-html='formatDate(article.pubdate)'></div>
    <hr />
    <div id='article-summary' v-html='summary'></div>
    <hr />
    <div id='article-description' v-html='description'></div>
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
    mounted() {
      document.addEventListener('click', (event) => {
        if (!event.target.matches('.article-link')) return;
        event.preventDefault();
        this.visit(event.target.href);
      });
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
        // const regex = /(href|HREF)\s*=\s*("|').*("|')/gm;
        const regex = /<a\s+/gm;
        return this.article.description.replace(regex, '<a class="article-link" ');
      },
      summary() {
        const regex = /<a\s+/gm;
        return this.article.summary.replace(regex, '<a class="article-link" ');
      },
    },
  };
</script>
