const iconv = require('iconv-lite')
const JTT809body1202 = require('./JTT809Body1202')

class JTT809Body1203 {
	decode(data) {
		const gnss_cnt = data.readUIntBE(0, 1)
		const gnss_data = []
		for (let i = 0; i < gnss_cnt; i++) {
			gnss_data.push(new JTT809body1202().decode(data.slice(1 + i * 36, 1 + (i + 1) * 36)))
		}
		return {
			gnss_data,
		}
	}

	encode(params) {
		const { gnss_data } = params
		const gnss_cnt_buf = Buffer.alloc(1)
		gnss_cnt_buf.writeUIntBE(gnss_data.length, 0, 1)
		const gnss_data_buf = []
		gnss_data.map((x) => {
			gnss_data_buf.push(new JTT809body1202().encode(x))
		})
		const data = Buffer.concat([gnss_cnt_buf, Buffer.concat(gnss_data_buf)])
		return data
	}
}
module.exports = JTT809Body1203
