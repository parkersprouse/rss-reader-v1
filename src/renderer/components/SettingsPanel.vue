<template>
  <vue-modal :clickToClose='true' height='auto' name='settings-panel' :scrollable='true'>
    <el-form ref='settings-form' :model='settings' label-width='50%'>
      <el-form-item label='Auto-refresh Feeds'>
        <el-switch v-model='settings.auto_refresh'></el-switch>
      </el-form-item>
      <el-form-item label='Auto-refresh Interval (minutes)'>
        <el-input-number v-model='settings.auto_refresh_interval' :min='1'></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type='primary'>Save</el-button>
        <el-button @click='closePanel'>Close</el-button>
      </el-form-item>
    </el-form>
  </vue-modal>
</template>

<script>
  export default {
    name: 'settings-panel',
    data() {
      return {
        settings: {
          auto_refresh: false,
          auto_refresh_interval: '',
        },
      };
    },
    methods: {
      closePanel() {
        this.$modal.hide('settings-panel');
      },
    },
  };
</script>
