const iconv = require('iconv-lite')

class JTT809Body1003 {

	body = {
		'1003': {
			"user_id": 5230,
			"password": "12345678"
		}
	}

	decode(data) {
		return {
			'user_id': data.readUIntBE(0, 4),
			'password': iconv.decode(data.slice(4, 12), 'gbk').replace(/\u0000/g, ''),
		}
	}

	encode(params) {
		const data = Buffer.alloc(12)
		const { user_id, password } = params
		data.writeUIntBE(user_id, 0, 4)
		data.write(iconv.encode(password, 'gbk').toString('hex'), 4, 8, 'hex')
		return data
	}
}
module.exports = JTT809Body1003
