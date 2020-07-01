
class JTT809Body9206 {
	decode(data) {
		return {
			'reason_code': data.toString('hex', 0, 1),
		}
	}

	encode(params) {
		const { reason_code } = params
		const reason_code_buf = Buffer.from(reason_code, 'hex')
		return reason_code_buf
	}
}

module.exports = JTT809Body9206
