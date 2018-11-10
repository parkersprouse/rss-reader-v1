<template>
  <modal :clickToClose='true' width='75%' height='75%' id='article-panel' name='article-panel'>
    <div id='article-title'>{{ article.title }}</div>
    <hr />
    <div id='article-date' v-html='formatDate(article.pubdate)'></div>
    <hr />
    <div id='article-description' v-html='article.desciption'></div>
  </modal>
</template>

<script>
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
    },
  };
</script>
