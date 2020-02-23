<template lang="pug">
  .append-list( :style="{height}")
    .table-row(v-for="header in headers")
     .table-row-name {{header}}
     .table-row-btn
      v-btn(small icon)
        v-icon keyboard-arrow-down
</template>

<script>
export default {
  name: 'AppendList',
  props: {
    height: {
      type: String,
      default: '100%',
    },
    headers: {
      type: Array,
      default: () => [
        'Austrailia', 'Europe', 'North Africa', 'North America',
      ],
    },
  },
};
</script>

<style lang="scss" scoped>
.append-list {
  width: 100%;
  overflow-y: scroll;
}

.append-list .table-row {
  width: 100%;
  height: 36px;
  display: flex;
}
.append-list .table-row .table-row-name {
  line-height: 36px;
  flex: 1;
}

.append-list .table-row .table-row-btn {
  // background-color: rebeccapurple;
}
</style>
