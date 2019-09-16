let festivals = {
	// 2019
	"2019-02-04": "除夕",
	"2019-02-05": "春节",
	"2019-02-19": "元宵",
	"2019-04-05": "清明",
	"2019-06-07": "端午",
	"2019-08-07": "七夕",
	"2019-09-13": "中秋",
	"2019-10-07": "重阳",
	// 2020
	"2020-01-24": "除夕",
	"2020-01-25": "春节",
	"2020-02-08": "元宵",
	"2020-04-04": "清明",
	"2020-06-25": "端午",
	"2020-08-25": "七夕",
	"2020-10-01": "中秋",
	"2020-10-25": "重阳"
},
holidays = [
	"2019-01-01",
	"2019-02-04",
	"2019-02-05",
	"2019-02-06",
	"2019-02-07",
	"2019-02-08",
	"2019-02-09",
	"2019-02-10",
	"2019-04-05",
	"2019-04-06",
	"2019-04-07",
	"2019-05-01",
	"2019-06-07",
	"2019-06-08",
	"2019-06-09",
	"2019-09-13",
	"2019-09-14",
	"2019-09-15",
	"2019-10-01",
	"2019-10-02",
	"2019-10-03",
	"2019-10-04",
	"2019-10-05",
	"2019-10-06",
	"2019-10-07",
],
works = [
	"2018-02-11",
	"2018-02-24",
	"2018-04-08",
	"2018-04-28",
	"2018-09-29",
	"2018-09-30",
	"2018-12-29",
	"2019-02-02",
	"2019-02-03",
	"2019-09-29",
	"2019-10-12",
];
/**
 * 假期
 * @param  {string} date 日期 yyyy-mm-dd
 * @return {Boolean}  是否为假期
 */
function getHolidays(date) {
	return holidays.indexOf(date) !== -1;
}
/**
 * 加班
 * @param  {string}
 * @return {Boolean}
 */
function getWorks(date) {
	return works.indexOf(date) !== -1;
}
/**
 * 节日
 * @param  {Date}
 * @return {string} 节日的中文名称
 */
function getFestival(date) {
	// let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let datestring = date.format("yyyy-MM-dd");
	let dateStr = festivals[datestring];
	if (dateStr) {
		return dateStr;
	}
	if (month === 1 && day === 1) {
		dateStr = "元旦";
	} else if (month === 2 && day === 14) {
		dateStr = "情人节";
	} else if (month === 5 && day === 1) {
		dateStr = "五一";
	} else if (month === 6 && day === 1) {
		dateStr = "儿童节";
	} else if (month === 10 && day === 1) {
		dateStr = "国庆节";
	} else if (month === 12 && day === 25) {
		dateStr = "圣诞节";
	} else {
		dateStr = false;
	}
	return dateStr;
}
/**
 * 去掉日期的时间信息
 * @return {Date}
 */
Date.prototype.clearTime = function() {
	this.setHours(0);
	this.setMinutes(0);
	this.setSeconds(0);
	this.setMilliseconds(0);
	return this;
};
/**
 * @returns { Date } 返回当天凌晨零点时间
 */
Date.today = function today() {
	return new Date().clearTime();
};
/**
 * 今天 明天
 * @param {*} date 
 */
function getRecentDay(date) {
	let today = Date.today();
	let tomorrow = Date.today().addDays(1);
	// let afterDay = Date.today().addDays(2);
	let dayStr = '';
	if (date.getTime() === today.getTime()) {
		dayStr = '今天';
	} else if (date.getTime() === tomorrow.getTime()) {
		dayStr = '明天';
	}
	return dayStr;
}
/**
 * new Date('2019-09-12') < new Date('2019-9-12')
 * false
 * new Date('2019-9-12') < new Date('2019-09-12')
 * true
 * funny
 * ios下 -有问题
 * @param {*} date 
 */
function compare(date) {
	return new Date(date);
}
export {
	getHolidays,
	getFestival,
	getWorks,
	getRecentDay,
	compare
}
