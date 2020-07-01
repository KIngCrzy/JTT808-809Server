const iconv = require('iconv-lite')

class JTT809Body1001 {
	decode(data) {
		return {
			'user_id': data.readUIntBE(0, 4),
			'password': iconv.decode(data.slice(4, 12), 'gbk').replace(/\u0000/g, ''),
			'down_link_ip': iconv.decode(data.slice(12, 44), 'gbk').replace(/\u0000/g, ''),
			'down_link_port': data.readUIntBE(44, 2),
		}
	}

	encode(params) {
		const data = Buffer.alloc(46)
		const {
			user_id, password, down_link_ip, down_link_port,
		} = params
		data.writeUIntBE(user_id, 0, 4)
		data.write(iconv.encode(password, 'gbk').toString('hex'), 4, 8, 'hex')
		data.write(iconv.encode(down_link_ip, 'gbk').toString('hex'), 12, 32, 'hex')
		data.writeUIntBE(down_link_port, 44, 2)
		return data
	}
}
module.exports = JTT809Body1001
