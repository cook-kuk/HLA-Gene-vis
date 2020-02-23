<template lang="pug">
  .home
    .header
    .content
      .left-side-bar.test
        append-list.test
      .main
      .right-side-bar
</template>

<script>
import AppendList from '../components/AppendList.vue';

export default {
  name: 'home',
  components: {
    'append-list': AppendList,
  },
};
</script>

<style lang="scss" scoped>
.test {
  border: solid 1px gray;
}

$hearder-height: 64px;

.home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.home .header {
  width: 100%;
  height: $hearder-height;
  background-color: royalblue;
}

.home .content {
  width: 100%;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.home .content .left-side-bar {
  width: 480px;
  height: 100%;
}

.main {
  flex: 2;
  background-color: beige;
}

.home .content .right-side-bar {
  width: 320px;
  height: 100%;
}
</style>
