/**
 * 日期月份加减
 * @param {int} value 需要加减的月份
 */
Date.prototype.addMonths = function (value) {
	this.setMonth(this.getMonth() + value * 1);
	return this;
};
/**
 * 设置日期为当月 1号
 */
Date.prototype.firstDayOfMonth = function () {
	this.setDate(1);
	return this;
};
/**
 * 日期天数加减
 * @param {int} value 需要加减的天数
 */
Date.prototype.addDays = function (value) {
	this.setDate(this.getDate() + value * 1);
	return this;
};
/**
 * 格式化时间
 * @param format 格式化 "yyyy-MM-dd hh:mm:ss www"
 * @returns {string} 格式化后字符串
 */
Date.prototype.format = function (dateStr) {
	const o = {
		'M+': this.getMonth() + 1,
		'd+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds(),
		'q+': Math.floor((this.getMonth() + 3) / 3),
		S: this.getMilliseconds(),
	};
	const w = [
		['日', '一', '二', '三', '四', '五', '六'],
		['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
	];

	if (/(y+)/.test(dateStr)) {
		dateStr = dateStr.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
	}
	if (/(w+)/.test(dateStr)) {
		dateStr = dateStr.replace(RegExp.$1, w[RegExp.$1.length - 1][this.getDay()]);
	}
	Object.keys(o).forEach((k) => {
		if (new RegExp(`(${k})`).test(dateStr)) {
			dateStr = dateStr.replace(RegExp.$1, (`00${o[k]}`).substr((`${o[k]}`).length));
		}
	});
	return dateStr;
};