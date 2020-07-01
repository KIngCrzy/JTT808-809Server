
class JTT809Body1007 {


	decode(data) {
		return {
			'error_code': data.toString('hex', 0, 1),
		}
	}
	encode(params) {
		const { error_code } = params
		const error_code_buf = Buffer.from(error_code, 'hex')
		return error_code_buf
	}

}
module.exports = JTT809Body1007
