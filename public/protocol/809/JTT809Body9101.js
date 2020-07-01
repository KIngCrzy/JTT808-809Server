
class JTT809Body9101 {

	body = {
		'9101': {
			dynamic_info_total: 10000,
			start_time: 1574319191,
			end_time: 1574322112
		}
	}

	decode(data) {
		return {
			'dynamic_info_total': data.readUIntBE(0, 4),
			'start_time': Number(data.readBigUInt64BE(4, 8)),
			'end_time': Number(data.readBigUInt64BE(12, 8)),
		}
	}

	encode(params) {
		const data = Buffer.alloc(20)
		const { dynamic_info_total, start_time, end_time } = params
		data.writeUIntBE(dynamic_info_total, 0, 4)
		data.writeBigUInt64BE(BigInt(start_time), 4, 8)
		data.writeBigUInt64BE(BigInt(end_time), 12, 8)
		return data
	}
}
module.exports = JTT809Body9101
