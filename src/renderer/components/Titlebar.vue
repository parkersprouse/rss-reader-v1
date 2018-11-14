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
      <!--
        This is intentionally ugly: https://css-tricks.com/fighting-the-space-between-inline-block-elements/
        This is the easiest solution and I'm lazy.
      -->
      <button @click='minimizeWindow'><i class='fas fa-minus'></i></button><button @click='maximizeWindow'><i class='fas fa-clone' v-if='is_maximized'></i><i class='fas fa-square' v-else></i></button><button @click='closeWindow' class='titlebar-close'><i class='fas fa-times'></i></button>
    </div>
  </div>
</template>

<script>
  import { remote } from 'electron';
  import SettingsPanel from '@/components/SettingsPanel';

  const window = remote.getCurrentWindow();

  export default {
    name: 'titlebar',
    data() {
      return {
        is_maximized: false,
        settings_panel_open: false,
      };
    },
    mounted() {
      window.on('unmaximize', () => {
        this.is_maximized = false;
      });
      window.on('maximize', () => {
        this.is_maximized = true;
      });
    },
    methods: {
      closeWindow() {
        window.close();
      },
      maximizeWindow() {
        if (window.isMaximized()) {
          window.unmaximize();
        } else {
          window.maximize();
        }
      },
      minimizeWindow() {
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
