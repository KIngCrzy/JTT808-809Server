class JTT808Body0301 {
	body = {
		'id': 12,
	}

	decode(data) {
		return {
			id: data.readUIntBE(0, 1)
		}
	}
	encode(params) {
		const { id } = params
		const data = Buffer.alloc(1)
		data.writeUIntBE(id, 0, 1)
		return data
	}
}

module.exports = JTT808Body0301
