
class JTT809Body9207 {
	decode(data) {
		return {
			'result': data.toString('hex', 0, 1),
		}
	}

	encode(params) {
		const { result } = params
		const result_buf = Buffer.from(result, 'hex')
		return result_buf
	}
}

module.exports = JTT809Body9207
