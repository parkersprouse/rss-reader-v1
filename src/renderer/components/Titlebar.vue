<template>
  <div id='titlebar'>
    <div id='titlebar-left'>
      RSS Feed Reader
    </div>
    <div id='titlebar-right'>
      <button @click='openSettingsPanel'>
        <i class='fas fa-cog'></i>
      </button>
      &nbsp;<span class='separator-vertical'>|</span>&nbsp;
      <!-- This is intentionally ugly: https://css-tricks.com/fighting-the-space-between-inline-block-elements/ -->
      <button @click='minimizeWindow'><i class='el-icon-minus'></i></button><button @click='maximizeWindow'><i class='el-icon-plus'></i></button><button @click='closeWindow' class='titlebar-close'><i class='el-icon-close'></i></button>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron';
  import SettingsPanel from '@/components/SettingsPanel';

  export default {
    name: 'titlebar',
    data() {
      return {
        settings_panel_open: false,
      };
    },
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
      openSettingsPanel() {
        this.$modal.show(
          SettingsPanel,
          null,
          {
            clickToClose: true,
            height: 'auto',
            id: 'settings-panel',
            name: 'settings-panel',
            scrollable: false,
          },
        );
      },
    },
  };
</script>
