class JTT808Header {
	validate(data) {
		const data_len = data.length
		let check_code = data[0]
		for (let i = 1; i < data_len; i++) {
			check_code ^= data[i]
		}
		if (check_code == 0) {
			return true
		}
		return false
	}

	fill(data) {
		const data_len = data.length
		let check_code = data[0]
		let index = 1
		while (index < data_len) {
			check_code ^= data[index]
			index += 1
		}

		const check_code_buf = Buffer.alloc(1)
		check_code_buf.writeUInt8(check_code, 0)
		return Buffer.concat([data, check_code_buf])
	}


	decode(data) {
		let total_packets
		let packet_number
		const is_split = Number(data[2].toString(2).padStart(8, '0').substr(-6, 1))
		if (is_split === 1) {
			total_packets = (data[12] << 8) + data[13]
			packet_number = (data[14] << 8) + data[15]
		} else {
			total_packets = 0
			packet_number = 0
		}

		return {
			message_id: data.toString('hex', 0, 2),
			phone_number: data.slice(4, 10).toString('hex'),
			flow_number: (data[10] << 8) + data[11],
			body_length: ((data[2] & 0b00000011) << 8) + data[3],
			is_encrypted: Number(data[2].toString(2).padStart(8, '0').substr(-3, 1)),
			is_split,
			total_packets,
			packet_number,
		}
	}

	encode(params) {
		const {
			message_id, body_length, is_encrypted, is_split, phone_number,
			flow_number, total_packets, packet_number,
		} = params
		let new_phone_number = phone_number
		if (new_phone_number.length < 12) {
			new_phone_number = `0${phone_number}`
		}
		// 消息ID
		const message_id_len = message_id.length / 2
		let data = Buffer.alloc(message_id_len)
		data.write(message_id, 0, message_id_len, 'hex')

		// 消息体属性
		const attributes_data = Buffer.alloc(2)
		if (is_encrypted === 1 && is_split === 1) {
			attributes_data.writeUIntBE(body_length | 0b0010010000000000, 0, 2)
		} else if (is_encrypted === 1) {
			attributes_data.writeUIntBE(body_length | 0b0000010000000000, 0, 2)
		} else if (is_split === 1) {
			attributes_data.writeUIntBE(body_length | 0b0010000000000000, 0, 2)
		} else {
			attributes_data.writeUIntBE(body_length, 0, 2)
		}
		// 终端手机号
		const phone_number_len = new_phone_number.length / 2
		const phone_number_buf = Buffer.alloc(phone_number_len)
		phone_number_buf.write(new_phone_number, 0, phone_number_len, 'hex')

		// 消息流水号
		const flow_number_buf = Buffer.alloc(2)
		flow_number_buf.writeUIntBE(flow_number, 0, 2)

		data = Buffer.concat([data, attributes_data, phone_number_buf, flow_number_buf])
		// 消息包封装项
		if (is_split === 1) {
			const total_packets_buf = Buffer.alloc(2)
			const packet_number_buf = Buffer.alloc(2)
			total_packets_buf.writeUIntBE(total_packets, 0, 2)
			packet_number_buf.writeUIntBE(packet_number, 0, 2)
			data = Buffer.concat([data, total_packets_buf, packet_number_buf])
		}
		return data
	}
}
module.exports = JTT808Header
