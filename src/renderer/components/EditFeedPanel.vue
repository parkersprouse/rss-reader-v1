<template>
  <div>
    <el-form label-width='15%'>
      <el-form-item label='Feed URL'>
        <el-input v-model='feed_src'></el-input>
      </el-form-item>
    </el-form>
    <div class='panel-btns'>
      <el-button @click='save' type='primary'>Save</el-button>
      <el-button @click='closePanel' type='dark'>Close</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'edit-feed-panel',
    props: ['feed', 'updateFeed'],
    data() {
      return {
        feed_src: this.feed,
      };
    },
    methods: {
      closePanel() {
        this.$modal.hide('edit-feed-panel');
      },
      save() {
        this.updateFeed(this.feed_src);
      },
    },
  };
</script>
