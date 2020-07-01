class JTT808Body8803 {
	body = {
		"media_type": 0,
		"channel_id": 1,
		"event_type": 0,
		"start_time": "191113105300",
		"end_time": "191113105900",
		"flag": 0
	}

	decode(data) {
		return {
			'media_type': data.readUIntBE(0, 1),
			'channel_id': data.readUIntBE(1, 1),
			'event_type': data.readUIntBE(2, 1),
			'start_time': data.toString('hex', 3, 9),
			'end_time': data.toString('hex', 9, 15),
			'flag': data.readUIntBE(15, 1),
		}
	}

	encode(params) {
		const {
			media_type, channel_id,
			event_type, start_time, end_time, flag,
		} = params
		const start_time_buf = Buffer.from(start_time, 'hex')
		const end_time_buf = Buffer.from(end_time, 'hex')

		const data = Buffer.alloc(start_time_buf.length + end_time_buf.length + 4)
		data.writeUInt8(media_type, 0)
		data.writeUInt8(channel_id, 1)
		data.writeUInt8(event_type, 2)
		data.write(start_time, 3, start_time_buf.length, 'hex')
		data.write(end_time, 3 + start_time_buf.length, end_time_buf.length, 'hex')
		data.writeUInt8(flag, 3 + start_time_buf.length + end_time_buf.length)
		return data
	}
}
module.exports = JTT808Body8803
