class JTT808Body0701 {
	body = {
		'length': 10,
		"content": "b5e7d7d3d4cbb5a5cafdbedda3ba"
	}

	decode(data) {
		return {
			length: data.readUIntBE(0, 4),
			content: data.toString('hex', 4)
		}
	}
	encode(params) {
		const { length, content } = params
		const data = Buffer.alloc(4)
		data.writeUIntBE(length, 0, 4)
		const result = Buffer.from(content, 'hex')
		return Buffer.concat([data, result])
	}
}

module.exports = JTT808Body0701
