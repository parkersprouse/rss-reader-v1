<template>
  <div>
    <custom-titlebar />
    <div id='container' :class='{ mac: mac_os }'>
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
  import { remote } from 'electron';

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
    data() {
      return {
        mac_os: remote.process.platform === 'darwin',
      };
    },
  };
</script>
