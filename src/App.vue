<template>
  <div id="app">
    <datePicker :mode="mode" :BE='BE' :selecteFuc="selecteFuc"></datePicker>
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
      a: '2018-8-10',
      b: '2020-8-10'
    }
  },
  methods: {
    selecteFuc(data) {
      console.log(data);
    }
  },
  components: {
    datePicker
  }
}
</script>

<style>
</style>
