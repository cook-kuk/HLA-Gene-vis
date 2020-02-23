<template lang="pug">
  #chip( :style="{backgroundColor: backgroundColor,color: textColor}" @click="emitClickChip") Asia
</template>

<script>
export default {
  props: {
    backgroundColor: {
      type: String,
      default: '#0f4c81',
    },
    textColor: {
      type: String,
      default: '#efefef',
    },
  },
  methods: {
    emitClickChip() {
      console.log('emitClickChip');
    },
  },
};
</script>

<style lang="scss" scoped>
#chip {
  width: 120px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
}
</style>>
