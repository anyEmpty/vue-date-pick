<template>
  <div class="calender" :class="{'calendar-range': mode == 'range'}">
    <div class="month-list">
      <div
        class="month"
        v-for="month in dateData"
        :id="month.monthId"
        :key="month.monthId">
        <h1>{{month.title}}</h1>
        <div class="title">
          <div v-for="(item, i) in weekArr" :key="item" :class="{'weekend': i > 4}">{{item}}</div>
        </div>
        <div class="day-line" v-for="(week, index) in month.month" :key="index">
          <div
            class="day"
            @click.stop.prevent="clickHandler($event)"
            v-for="day in week"
            :key="day.date"
            :data-text="day.tips"
            :data-date="day.date"
            :data-disabled="day.disable"
            :class="{
              hide:!day.text,
              disable: day.disable,
              festival: day.festival,
              today: day.alias === '今天',
              selected: selectedTime === day.date,
              startend: checkStart === day.date || checkEnd === day.date,
              work: day.fillWork, //补班
              relax: day.relax, // 休假期
              range: mode === 'range' && twoClick == 0 && compare(day.date) > compare(checkStart) && compare(checkEnd) > compare(day.date),
              rangechecked: mode === 'range' && twoClick == 0 && (checkStart === day.date || checkEnd === day.date),
              left: mode === 'range' && checkStart === day.date,
              right: mode === 'range' && checkEnd === day.date,
            }">
              <div class="day-item" :data-text="day.tips">
                <p>{{day.alias || day.text}}</p>
                <p v-if="checkStart === day.date">start</p>
                <p v-else-if="checkEnd === day.date">end</p>
              </div>
              <div class="day-bg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './utils.js';
import { getHolidays, getFestival, getWorks, getRecentDay, compare } from './holiday';
export default {
  name: 'calender',
  props: {
    // 点击接收事件
    selecteFuc: {
      type: Function,
    },
    // 日期范围开始
    startDate: {
      type: String,
      default: new Date().clearTime().format('yyyy/MM/dd')
    },
    // 日期范围结束
    endDate: {
      type: String,
      default: new Date().addMonths(12).format('yyyy/MM/dd')
    },
    // 开始结束时间数组 ['2019-8-10', '2019-9-9']
    BE: {
      type: Array,
      default () {
        return []
      }
    },
    // 模式 start（开始时间）end （结束时间）range（时间范围）
    mode: {
      type: String,
      default: 'start'
    }
  },
  data () {
    let checkStart, checkEnd, t;
    if (this.BE.length) {
      checkStart = this.transfer(this.BE[0]);
      checkEnd = this.BE[1] && this.transfer(this.BE[1]);
    }
    t = this.mode === 'end' ? checkEnd : checkStart;
    return {
      calendarData: null,
      weekArr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      selected: t || new Date().format('yyyy/MM/dd'), // 选中
      checkStart: checkStart, // 开始
      checkEnd: checkEnd && checkEnd, // 结束
      twoClick: 0, // range点击标志
      compare // 比较转化
    }
  },
  computed: {
    selectedTime() {
      return new Date(this.selected).format('yyyy/MM/dd');
    },
  },
  methods: {
    // 初始化日期转化 -/ 补0
    transfer(date) {
      return new Date(date.replace(/-/g, '/')).format('yyyy/MM/dd')
    },
    // 创建日期月份数据
    buildMonthDate(time) {
      let monthDate = [];
      let month = time.getMonth();
      let date = new Date(time);
      var t = time.getDay() === 0 ? 6 : time.getDay() - 1;
      let dateList = new Array(t).fill('');

      while (date.getMonth() === month) {
        let dateInfo = {};
        if (dateList.length === 7) {
          monthDate.push(dateList);
          dateList = [];
        }
        dateInfo = {
          text: date.getDate(),
          dateTime: date.getTime(),
          date: date.format('yyyy/MM/dd'),
          tips: ''
        }
        // 开始日期之前和结束日期之后的日期置灰
        if (date < this.startDate || date > this.endDate) {
          dateInfo.disable = true;
        }
        if (this.mode === 'end' && new Date(date) < new Date(this.checkStart)) {
          // 返程时间必须大于去程时间
          dateInfo.disable = true;
        }

        // 节日处理
        let festival = getFestival(date);
        if (festival) {
          dateInfo.festival = festival;
          dateInfo.text = festival;
        }
        if (getHolidays(dateInfo.date)) {
          // 休息日
          dateInfo.relax = true;
          dateInfo.tips = '休';
        } else if (getWorks(dateInfo.date)) {
          // 工作日
          dateInfo.fillWork = true;
          dateInfo.tips = '班';
        }
        // 最近日期处理  今天明天 后天
        let recentDay = getRecentDay(date);
        if (recentDay) {
          dateInfo.alias = recentDay;
          dateInfo.festival = '';
        }

        dateList.push(dateInfo);
        date.addDays(1);
      }

      // 不满7 补充完整
      if (dateList.length) {
        for (let i = dateList.length; i < 7; i++) {
          dateList.push('');
        }
        monthDate.push(dateList);
        dateList = null;
      }
      return {
        month: monthDate,
        title: `${time.getFullYear()}年${time.getMonth() + 1}月`,
        monthId: `${time.getFullYear()}${time.getMonth() + 1}`
      };
    },
    // 创建日期数据
    buildData() {
      let startDate = compare(this.startDate);
      let endDate = compare(this.endDate);
      let dateData = [];
      while (startDate <= endDate) {
        let month = this.buildMonthDate(startDate.firstDayOfMonth());
        dateData.push(month);
        startDate.addMonths(1);
      }
      return dateData;
    },    
    // 点击事件处理    
    clickHandler(e) {
      if (e.currentTarget.dataset.disabled) return;
      let date = e.currentTarget.dataset.date;
      let t = {
        'start': 'clickHandlerStart',
        'end': 'clickHandlerEnd',
        'range': 'clickHandlerRange'
      }
      
      this.selected = new Date(date);
      let emitData = this[t[this.mode]](date);
      if (!emitData) return;
      
      this.selecteFuc && this.selecteFuc({
          date,
          BE: emitData
      });
    },
    clickHandlerStart(date) {
      this.checkStart = date;
      if (compare(date) >= compare(this.checkEnd)) {
        this.checkEnd = '';
      }
      alert(`选择开始时间为${date}，结束时间为${this.checkEnd || '--'}`);
      return [date, this.checkEnd];
    },
    clickHandlerEnd(date) {
      this.checkEnd = date;
      alert(`选择开始时间为${this.checkStart || '--'}，结束时间为${date || '--'}`);
      return [this.checkStart, date];
    },
    clickHandlerRange(date) {
      if (!this.twoClick) {
        this.checkStart = date;
        this.checkEnd = '';
      } else {
        // 点击比较 第二次点击值需要大于第一次点击值
        if (compare(date) < compare(this.checkStart)) {
          this.twoClick = 0;
          this.checkStart = date;
        } else {
          this.checkEnd = date;
        }
      }
      ++this.twoClick;
      if (this.twoClick === 1) return false;
      this.twoClick = 0;
      alert(`选择开始时间为${this.checkStart || '--'}，结束时间为${this.checkEnd || '--'}`);
      return [this.checkStart, this.checkEnd];
    },
    // 刷新初始化
    refresh() {
      let checkStart, checkEnd, t;
      if (this.BE.length) {
        checkStart = this.transfer(this.BE[0]);
        checkEnd = this.BE[1] && this.transfer(this.BE[1]);
      }
      switch (this.mode) {
        case 'start':
        case 'range':
          t = checkStart;
          break;
        case 'end':
          t = checkEnd;
          break;
      }
      this.checkStart = checkStart;
      this.checkEnd = checkEnd;
      this.selected = t;
      this.dateData = this.buildData();
    }
  },
  created () {
    this.dateData = this.buildData();
  },
  mounted() {
    // 定位
    setTimeout(() => {
      let time = new Date(this.selected);
      let el = document.getElementById(`${time.getFullYear()}${time.getMonth() + 1}`);
      el && el.scrollIntoView()
    }, 0)
  },

}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>