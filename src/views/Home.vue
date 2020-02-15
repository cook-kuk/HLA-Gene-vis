<template lang="pug">
  .home
    .left-side-bar
    .main
    .right-side-bar
</template>

<script>
export default {
  name: 'home',
};
</script>

<style lang="scss" scoped>
.test {
  border: solid 1px gray;
}

.home {
  width: 100%;
  height: 100%;
  background-color: rebeccapurple;
  display: flex;
}

.home .left-side-bar {
  width: 320px;
  height: 100%;
  background-color: antiquewhite;
}

.home .main {
  height: 100%;
  flex: 1;
  background-color: aliceblue;
}

.home .right-side-bar {
  width: 320px;
  height: 100%;
  background-color: aquamarine;
}

</style>
