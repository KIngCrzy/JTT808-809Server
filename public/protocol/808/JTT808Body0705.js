class JTT808Body0705 {
    body = {
        "reception_time": "1712300100",
        "can_data": [
            {
                "channel_id": 0,
                "frame_type": 0,
                "collection_method": 0,
                "bus_id": 0,
                "bus_data": "8001000501234567"
            }
        ]
    }

    decode(data) {
        const item_num = data.readUIntBE(0, 2)
        const reception_time = data.slice(2, 7).toString('hex')
        const can_data = []

        for (let i = 0; i < item_num; i += 1) {
            const start_index = 7 + 12 * i
            const can_id = data.readUIntBE(start_index, 4)
            const channel_id = (can_id >> 31) & 0b1
            const frame_type = (can_id >> 30) & 0b1
            const collection_method = (can_id >> 29) & 0b1
            const bus_id = can_id & 0b11111111111111111111111111111
            const bus_data = data.slice(start_index + 4, start_index + 12).toString('hex')
            can_data.push({
                'channel_id': channel_id,
                'frame_type': frame_type,
                'collection_method': collection_method,
                'bus_id': bus_id,
                'bus_data': bus_data
            })
        }
        return {
            'reception_time': reception_time,
            'can_data': can_data
        }
    }

    encode(params) {
        const { reception_time, can_data } = params
        let data = Buffer.alloc(7)
        data.writeUIntBE(can_data.length, 0, 2)
        data.write(reception_time, 2, 5, 'hex')

        for (let i = 0; i < can_data.length; i += 1) {
            let sub_data = Buffer.alloc(12)
            const { channel_id, frame_type, collection_method, bus_id, bus_data } = can_data[i]
            let can_id = 0b00000000000000000000000000000000
            if (channel_id === 1) { can_id |= 0b10000000000000000000000000000000 }
            if (frame_type === 1) { can_id |= 0b01000000000000000000000000000000 }
            if (collection_method === 1) { can_id |= 0b00100000000000000000000000000000 }
            can_id |= bus_id
            sub_data.writeUIntBE(can_id, 0, 4)
            sub_data.write(bus_data, 4, 8, 'hex')
            data = Buffer.concat([data, sub_data])
        }
        return data
    }
}

module.exports = JTT808Body0705
