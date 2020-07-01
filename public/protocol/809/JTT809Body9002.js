
class JTT809Body9002 {
	decode(data) {
		return {
			'RESULT': data.readUIntBE(0, 2),
		}
	}

	encode(params) {
		const data = Buffer.alloc(2)
		const { RESULT } = params
		data.writeUIntBE(RESULT, 0, 2)
		return data
	}

}
module.exports = JTT809Body9002
