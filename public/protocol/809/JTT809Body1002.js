
class JTT809Body1002 {

	decode(data) {
		return {
			'result': data.toString('hex', 0, 1),
			'verify_code': data.readUIntBE(1, 4),
		}
	}

	encode(params) {
		const verify_code_buf = Buffer.alloc(4)
		const { result, verify_code } = params
		const result_buf = Buffer.from(result, 'hex')
		verify_code_buf.writeUIntBE(verify_code, 0, 4)
		return Buffer.concat([result_buf, verify_code_buf])
	}
}
module.exports = JTT809Body1002
