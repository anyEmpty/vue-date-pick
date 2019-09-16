# vue-date-picker

## 支持三种方式

### 选择开始时间 mode = start
### 选择结束时间 mode = start
### 选择范围     mode = range

## props 接受参数

### selecteFuc 点击接收事件
### startDate  日期范围开始
### endDate    日期范围结束
### BE         开始结束时间数组 ['2019-8-10', '2019-9-9']
### mode:      模式 start（开始时间）end （结束时间）range（时间范围）

### 点击后执行selecteFuc返回格式

```
 {
     BE: ["2019-09-20", "2019-09-28"]  // 选择开始时间   选择结束时间
     date: "2019-09-28"
 }
```


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
