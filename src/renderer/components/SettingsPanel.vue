<template>
  <vue-modal :clickToClose='true' height='auto' name='settings-panel' :scrollable='true'>
    <el-form ref='settings-form' :model='settings' label-width='40%'>
      <el-form-item label='Auto-refresh Feeds'>
        <el-switch v-model='settings.auto_refresh'></el-switch>
      </el-form-item>
      <el-form-item label='Auto-refresh Interval'>
        <el-input-number v-model='settings.auto_refresh_interval' :min='1'></el-input-number>
        <span style='margin-left: 0.5rem;'>minutes</span>
      </el-form-item>
    </el-form>
    <div class='settings-panel-btns'>
      <el-button @click='saveSettings' type='primary'>Save</el-button>
      <el-button @click='closePanel'>Close</el-button>
    </div>
  </vue-modal>
</template>

<script>
  import db from '@/lib/db';
  import timer from '@/lib/timer';

  const settings = db.get('settings');

  export default {
    name: 'settings-panel',
    data() {
      return {
        settings: {
          auto_refresh: settings.value().auto_refresh || false,
          auto_refresh_interval: ((settings.value().auto_refresh_interval / 1000) / 60) || 1,
        },
      };
    },
    mounted() {
      // When initially loading the app, start the auto refresh if settings tell us to
      if (this.settings.auto_refresh && this.settings.auto_refresh_interval) {
        timer.set(() => this.$root.$emit('feedsRefreshed'), settings.value().auto_refresh_interval);
      }
    },
    methods: {
      closePanel() {
        this.$modal.hide('settings-panel');
      },
      saveSettings() {
        const interval_in_minutes = this.settings.auto_refresh_interval * 1000 * 60;
        const timer_changed = interval_in_minutes !== settings.value().auto_refresh_interval ||
                              this.settings.auto_refresh !== settings.value().auto_refresh;

        db.set('settings.auto_refresh', this.settings.auto_refresh)
          .set('settings.auto_refresh_interval', interval_in_minutes)
          .write();
        this.$message({
          customClass: 'el-message--success',
          duration: 1500,
          iconClass: 'el-icon-check',
          message: 'Settings Saved',
          type: 'success',
        });

        // Restart the auto refresh timer if the settings tell us to
        if (timer_changed) {
          if (this.settings.auto_refresh && this.settings.auto_refresh_interval) {
            timer.set(() => this.$root.$emit('feedsRefreshed'), interval_in_minutes);
          } else {
            timer.stop();
          }
        }
      },
    },
  };
</script>
