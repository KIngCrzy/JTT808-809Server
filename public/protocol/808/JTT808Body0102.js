const iconv = require('iconv-lite')

class JTT808Body0102 {
	body = {
		'authentication_code': '6CB1EEDCC95',
	}

	setCode(params) {
		this.body = {
			'authentication_code': params,
		}
	}

	decode(data) {
		return {
			authentication_code: iconv.decode(data, 'gbk'),
		}
	}

	encode(params) {
		const { authentication_code } = params
		const data = iconv.encode(authentication_code, 'gbk')
		return data
	}
}
module.exports = JTT808Body0102
