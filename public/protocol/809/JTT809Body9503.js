const iconv = require('iconv-lite')

class JTT809Body9503 {
	decode(data) {
		const msg_length = data.readUIntBE(5, 4)
		return {
			'msg_sequence': data.readUIntBE(0, 4),
			'msg_priority': data.toString('hex', 4, 5),
			'msg_content': iconv.decode(data.slice(9, 9 + msg_length), 'gbk').replace(/\u0000/g, ''),
		}
	}

	encode(params) {
		const { msg_sequence, msg_priority, msg_content } = params
		const msg_sequence_buf = Buffer.alloc(5)
		const msg_content_length_buf = Buffer.alloc(4)

		msg_sequence_buf.writeUIntBE(msg_sequence, 0, 4)
		msg_sequence_buf.writeUIntBE(msg_priority, 4, 1)

		const msg_content_buf = iconv.encode(msg_content, 'gbk')
		msg_content_length_buf.writeUIntBE(msg_content_buf.length, 0, 4)
		const data = Buffer.concat([msg_sequence_buf, msg_content_length_buf, msg_content_buf])
		console.log('data', data)
		return data
	}
}
module.exports = JTT809Body9503
