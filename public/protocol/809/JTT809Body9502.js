class JTT809Body9502 {
	decode(data) {
		return {
			'lens_id': data.readUIntBE(0, 1),
			'size': data.toString('hex', 1, 2),
		}
	}

	encode(params) {
		const { lens_id, size } = params
		const data_buf = Buffer.alloc(1)
		const result_buf = Buffer.from(size, 'hex')
		data_buf.writeUIntBE(lens_id, 0, 1)
		return Buffer.concat([data_buf, result_buf])	
	}
}
module.exports = JTT809Body9502
