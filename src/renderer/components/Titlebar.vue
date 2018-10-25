<template>
  <div id='titlebar'>
    <div id='titlebar-left'>
      RSS Feed Reader
    </div>
    <div id='titlebar-right'>
      <button @click='minimizeWindow'>
        <i class='el-icon-minus'></i>
      </button>
      <button @click='maximizeWindow'>
        <i class='el-icon-plus'></i>
      </button>
      <button @click='closeWindow' class='titlebar-close'>
        <i class='el-icon-close'></i>
      </button>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron';

  export default {
    name: 'titlebar',
    methods: {
      closeWindow() {
        const window = remote.getCurrentWindow();
        window.close();
      },
      maximizeWindow() {
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
          window.maximize();
        } else {
          window.unmaximize();
        }
      },
      minimizeWindow() {
        const window = remote.getCurrentWindow();
        window.minimize();
      },
    },
  };
</script>
