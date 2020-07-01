
class JTT809Body9003 {
	decode(data) {
		return {
			'verify_code': data.readUIntBE(0, 4),
		}
	}

	encode(params) {
		const data = Buffer.alloc(4)
		const { verify_code } = params
		data.writeUIntBE(verify_code, 0, 4)
		return data
	}
}
module.exports = JTT809Body9003
