class JTT808Body0302 {
	body = {
		'flow_number': 8989,
		'id': 12,
	}
	decode(data) {
		return {
			flow_number: data.readUIntBE(0, 2),
			id: data.readUIntBE(2, 1)
		}
	}
	encode(params) {
		const { flow_number, id } = params
		const data = Buffer.alloc(3)
		data.writeUIntBE(flow_number, 0, 2)
		data.writeUIntBE(id, 2, 1)
		return data
	}
}
module.exports = JTT808Body0302
