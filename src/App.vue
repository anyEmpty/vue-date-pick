<template>
  <div id="app">
    <datePicker :mode="mode" :BE='BE' :selecteFuc="selecteFuc" ref="datePicker"></datePicker>
    <div class="test">
      <span @click="change('start')">选择去程</span>
      <span @click="change('end')">选择返程</span>
      <span @click="change('range')">往返选择</span>
    </div>
  </div>
</template>

<script>
import datePicker from './components/date-picker'

export default {
  name: 'app',
  data () {
    return {
      BE: ['2019-9-12', '2019-9-15'],
      mode: 'range',
    }
  },
  methods: {
    selecteFuc(data) {
      console.log(data);
    },
    change(mode) {
      this.mode = mode;
      this.$nextTick(() => {
        this.$refs.datePicker.refresh();
      })
    }
  },
  components: {
    datePicker
  }
}
</script>

<style lang="less" scoped>
.test{
  padding: 0 20px;
  background-color: rgba(72, 109, 23, 0.6);
  box-sizing: border-box;
  color: #fff;
  position: fixed;
  width: 100%;
  bottom: 20px;
  left: 0;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100000;
}

</style>
