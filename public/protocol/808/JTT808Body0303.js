class JTT808Body0303 {
	body = {
		'type': 1,
		'flag': 0,
	}

	decode(data) {
		return {
			type: data.readUIntBE(0, 1),
			flag: data.readUIntBE(1, 1)
		}
	}
	encode(params) {
		const { type, flag } = params
		const data = Buffer.alloc(2)
		data.writeUIntBE(type, 0, 1)
		data.writeUIntBE(flag, 1, 1)
		return data
	}
}

module.exports = JTT808Body0303
