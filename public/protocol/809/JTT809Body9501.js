const iconv = require('iconv-lite')

class JTT809Body9501 {
	decode(data) {
		return {
			'monitor_tel': iconv.decode(data.slice(0, 20), 'gbk').replace(/\u0000/g, ''),
		}
	}

	encode(params) {
		const { monitor_tel } = params
		const monitor_tel_buf = iconv.encode(monitor_tel, 'gbk')
		return monitor_tel_buf
	}
}
module.exports = JTT809Body9501
