<template>
  <div>
    <div id='article-title' @click='visit'><h2>{{ article.title }}</h2></div>
    <div id='article-date' v-if='article.pubdate' v-html='pubdate'></div>
    <div id='article-summary' v-if='article.summary'>
      <h3>Summary</h3>
      <div v-html='summary' ref='article_summary'></div>
    </div>
    <div id='article-description' v-if='article.description'>
      <h3>Detailed</h3>
      <div v-html='description' ref='article_description'></div>
    </div>
  </div>
</template>

<script>
  import { shell } from 'electron';
  import moment from 'moment';

  const class_regex = /class\s*=\s*("|')[a-zA-Z0-9:;.\s()\-,]*("|')/gmi;
  const id_regex = /id\s*=\s*("|')[a-zA-Z0-9:;.\s()\-,]*("|')/gmi;
  const link_regex = /<a\s+/gmi;
  const style_regex = /style\s*=\s*("|')[a-zA-Z0-9:;.\s()\-,]*("|')/gmi;

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
        if (!event.target.matches('.article-link')) return;
        event.preventDefault();
        shell.openExternal(event.target.href);
      },
      visit() {
        shell.openExternal(this.article.link);
      },
    },
    computed: {
      description() {
        return this.article.description
          .replace(class_regex, '')
          .replace(id_regex, '')
          .replace(style_regex, '')
          .replace(link_regex, '<a class="article-link" ');
      },
      pubdate() {
        const parsed_date = moment(this.article.pubdate);
        return `${parsed_date.format('MM/DD/YYYY')} &bull; ${parsed_date.format('hh:mm a')}`;
      },
      summary() {
        return this.article.summary
          .replace(class_regex, '')
          .replace(id_regex, '')
          .replace(style_regex, '')
          .replace(link_regex, '<a class="article-link" ');
      },
    },
  };
</script>
