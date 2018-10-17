<template>
  <div>
    <div id='sidebar'>
      <rss-sidebar />
    </div>
    <div id='main'>
      <main-container />
    </div>
  </div>
</template>

<script>
  import MainContainer from '@/components/MainContainer';
  import Sidebar from '@/components/Sidebar';

  export default {
    name: 'main-page',
    components: {
      'main-container': MainContainer,
      'rss-sidebar': Sidebar,
    },
  };
</script>
