
class JTT809Body9007 {
	decode(data) {
		return {
			'reason_code': data.readUIntBE(0, 1),
		}
	}
	
	encode(params) {
		const data = Buffer.alloc(1)
		const { reason_code } = params
		data.writeUIntBE(reason_code, 0, 1)
		return data
	}

}
module.exports = JTT809Body9007
