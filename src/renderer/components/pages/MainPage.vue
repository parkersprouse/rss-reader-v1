<template>
  <div>
    <div id='titlebar'>
      <custom-titlebar />
    </div>
    <div id='container'>
      <div id='sidebar'>
        <rss-sidebar />
      </div>
      <div id='main'>
        <main-container />
      </div>
    </div>
  </div>
</template>

<script>
  import MainContainer from '@/components/MainContainer';
  import Sidebar from '@/components/Sidebar';
  import Titlebar from '@/components/Titlebar';

  export default {
    name: 'main-page',
    components: {
      'main-container': MainContainer,
      'rss-sidebar': Sidebar,
      'custom-titlebar': Titlebar,
    },
  };
</script>
