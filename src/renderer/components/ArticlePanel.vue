<template>
  <div>
    <div id='article-title' @click='visit(article.link)'><h2>{{ article.title }}</h2></div>
    <div id='article-date' v-if='article.pubdate' v-html='pubdate'></div>
    <div id='article-summary' v-if='article.summary'>
      <h3>Summary</h3>
      <div v-html='sanitize(article.summary)' ref='article_summary'></div>
    </div>
    <div id='article-description' v-if='article.description'>
      <h3>Detailed</h3>
      <div v-html='sanitize(article.description)' ref='article_description'></div>
    </div>
  </div>
</template>

<script>
  import { shell } from 'electron';
  import moment from 'moment';

  const class_regex = /class\s*=\s*("|')[a-zA-Z0-9:;%.\s()\-,]*("|')/gmi;
  const height_regex = /height\s*=\s*("|')[a-zA-Z0-9:;%.\s()\-,]*("|')/gmi;
  const id_regex = /id\s*=\s*("|')[a-zA-Z0-9:;%.\s()\-,]*("|')/gmi;
  const style_regex = /style\s*=\s*("|')[a-zA-Z0-9:;%.\s()\-,]*("|')/gmi;
  const width_regex = /width\s*=\s*("|')[a-zA-Z0-9:;%.\s()\-,]*("|')/gmi;

  export default {
    name: 'article-panel',
    props: {
      article: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      if (this.$refs.article_summary) {
        this.$refs.article_summary.addEventListener('click', this.handleLink, false);
      }
      if (this.$refs.article_description) {
        this.$refs.article_description.addEventListener('click', this.handleLink, false);
      }
    },
    methods: {
      handleLink(event) {
        if (!event.target.matches('a') && !event.target.parentElement.matches('a')) return;
        event.preventDefault();
        this.visit(event.target.href || event.target.parentElement.href);
      },
      sanitize(text) {
        return text
          .replace(class_regex, '')
          .replace(id_regex, '')
          .replace(style_regex, '')
          .replace(width_regex, '')
          .replace(height_regex, '');
      },
      visit(link) {
        shell.openExternal(link);
      },
    },
    computed: {
      pubdate() {
        const parsed_date = moment(this.article.pubdate);
        return `${parsed_date.format('hh:mm a')} &sdot; ${parsed_date.format('dddd, MMMM Do YYYY')}`;
      },
    },
  };
</script>
