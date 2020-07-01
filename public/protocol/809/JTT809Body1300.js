const JTT809body1301 = require('./JTT809Body1301')
const JTT809body1302 = require('./JTT809Body1302')

const JTT809Body1301 = new JTT809body1301()
const JTT809Body1302 = new JTT809body1302()
class JTT809Body1300 {
	constructor() {
		this.DATA_TYPE = {
			1301: JTT809Body1301,
			1302: JTT809Body1302,
		}
	}

	body = {
		'1301': {
			"data_type": "1301",
			"data": {
				"info_id": 0,
				"info_content": "平台查岗应答"
			}
		},
		'1302': {
			"data_type": "1302",
			"data": {
				"info_id": 0
			}
		},
	}

	decode(data) {
		const data_type = data.slice(0, 2).toString('hex')
		const data_length = data.readUIntBE(2, 4)
		return {
			data_type,
			data: this.DATA_TYPE[data_type].decode(data.slice(6, 6 + data_length)),
		}
	}

	encode(params) {
		const { data_type, data } = params
		const data_type_buf = Buffer.from(data_type, 'hex')
		const data_section = this.DATA_TYPE[data_type].encode(data)
		const data_length_buf = Buffer.alloc(4)
		data_length_buf.writeUIntBE(data_section.length, 0, 4)
		const body = Buffer.isBuffer(data_section) ? Buffer.concat([data_type_buf, data_length_buf, data_section]) : Buffer.concat([data_type_buf, data_length_buf])
		return body
	}
}
module.exports = JTT809Body1300
