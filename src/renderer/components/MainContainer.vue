<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <feed-card src='https://feeds.feedburner.com/Metalsucks' />
      </el-col>
      <el-col :span="8">
        <feed-card src='https://feeds.feedburner.com/Metalsucks' />
      </el-col>
      <el-col :span="8">
        <feed-card src='https://feeds.feedburner.com/Metalsucks' />
      </el-col>
      <el-col :span="8">
        <feed-card src='https://feeds.feedburner.com/Metalsucks' />
      </el-col>
      <el-col :span="8">
        <feed-card src='https://feeds.feedburner.com/Metalsucks' />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import FeedCard from '@/components/FeedCard';

  export default {
    name: 'main-container',
    components: {
      'feed-card': FeedCard,
    },
  };
</script>
