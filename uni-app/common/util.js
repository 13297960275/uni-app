function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
const dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

const timeFilter = {
	formatDate: function(date, format) {
		var regExps = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'H+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds(),
			'q+': Math.floor((date.getMonth() + 3) / 3),
			'S': date.getMilliseconds()
		};

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 -
				RegExp.$1.length));
		}

		for (var reg in regExps) {
			var regExp = new RegExp('(' + reg + ')'),
				temp = regExps[reg] + '',
				real;
			if (regExp.test(format)) {
				real = RegExp.$1.length == 1 ? temp : ('00' + temp).substr(temp.length);
				format = format.replace(RegExp.$1, real);
			}
		}

		return format;
	},

	parseDate: function(value, format) {
		var that = this;
		// 标准转换格式
		var stand = 'yyyy/MM/dd HH:mm:ss',
			now = new Date(),
			idx = 0,
			date,
			length,
			reg;

		// 匹配格式库
		var formats = [
			'yyyyMMddHHmmss',
			'yyyyMMddHHmm',
			'yyyyMMdd',
			'yyyy-MM-dd HH:mm:ss.t',
			'yyyy-MM-dd HH:mm:ss',
			'yyyy-MM-dd HH:mm',
			'yyyy-MM-dd',
			'HHmmss',
			'HH:mm:ss'
		];

		var regExps = {
			'y+': now.getFullYear(),
			'M+': now.getMonth() + 1,
			'd+': now.getDate(),
			'H+': 0,
			'm+': 0,
			's+': 0
		};

		var numberRegExp = /^\d*$/;

		var objectToString = {}.toString;

		// 如果是日期，则直接返回
		if (objectToString.call(value) === '[object Date]') {
			date = value;
		} else if (value) {
			for (length = formats.length; idx < length; idx++) {
				var newData = stand,
					newFormat = formats[idx];

				if (newFormat.length != value.length) {
					continue;
				}

				for (reg in regExps) {
					var regExp = new RegExp('(' + reg + ')'),
						index = newFormat.search(regExp),
						temp = '';
					if (index >= 0) {
						temp = value.substr(index, RegExp.$1.length);
						if (!numberRegExp.test(temp)) {
							break;
						}
					} else {
						temp = regExps[reg] + '';
					}
					temp = temp.length == 1 ? '0' + temp : temp;
					newData = newData.replace(regExp, temp);
				}

				try {
					date = new Date(newData);
					if (!date.getTime()) {
						continue;
					}
					break;
				} catch (e) {
					continue;
				}
			}
		}

		// 如果存在格式化
		value = !(date && date.getTime && date.getTime()) ? value : date;
		if (format) {
			return timeFilter.formatDate(value, format);
		} else {
			return value;
		}
	}
};

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
function parseTime(time, cFormat) {
	if (arguments.length === 0) {
		return null
	}
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
function formatZHTime(time, option) {
	if (('' + time).length === 10) {
		time = parseInt(time) * 1000
	} else {
		time = +time
	}
	const d = new Date(time)
	const now = Date.now()

	const diff = (now - d) / 1000

	if (diff < 30) {
		return '刚刚'
	} else if (diff < 3600) {
		// less 1 hour
		return Math.ceil(diff / 60) + '分钟前'
	} else if (diff < 3600 * 24) {
		return Math.ceil(diff / 3600) + '小时前'
	} else if (diff < 3600 * 24 * 2) {
		return '1天前'
	}
	if (option) {
		return parseTime(time, option)
	} else {
		return (
			d.getMonth() +
			1 +
			'月' +
			d.getDate() +
			'日' +
			d.getHours() +
			'时' +
			d.getMinutes() +
			'分'
		)
	}
}

/**
 * @param {string} url
 * @returns {Object}
 */
function param2Obj(url) {
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	return JSON.parse(
		'{"' +
		decodeURIComponent(search)
		.replace(/"/g, '\\"')
		.replace(/&/g, '","')
		.replace(/=/g, '":"')
		.replace(/\+/g, ' ') +
		'"}'
	)
}

function randomString(length, chars) {
	let result = ''
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
	return result
}

function replaceAll(str, f, e) { // 把str中所有的f替换成e
	const reg = new RegExp(f, 'g') // 创建正则RegExp对象
	return str.replace(reg, e)
}

module.exports = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	timeFilter: timeFilter,
	parseTime: parseTime,
	formatZHTime: formatZHTime,
	param2Obj: param2Obj,
	randomString: randomString,
	replaceAll: replaceAll,
}
