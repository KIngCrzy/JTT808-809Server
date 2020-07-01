class JTT808Body8800 {
    body = {
        "media_id": 100,
        "totsl": 2,
        'list': [
            '0102',
            '0304'
        ]
    }
    decode(data) {
        const list = []
        const media_id = data.readUIntBE(0, 4)
        const total = data.readUIntBE(4, 1)
        const data_buf = data.slice(5)

        for (let i = 0; i < total; i += 1) {
            const result = data_buf.slice(i * 2, 2 + i * 2).toString('hex')
            list.push(result)
        }
        return {
            "media_id": media_id,
            "totsl": total,
            'list': list
        }
    }

    encode(params) {
        const { media_id, list } = params
        let data = Buffer.alloc(4)
        data.writeUIntBE(media_id, 0, 4)
        if (list) {
            const list_len = list.length
            const list_len_buf = Buffer.alloc(1)
            list_len_buf.writeUIntBE(list_len, 0, 1)
            data = Buffer.concat([data, list_len_buf])
            for (let i = 0; i < list_len; i += 1) {
                const packet_buf = Buffer.from(list[i], 'hex')
                data = Buffer.concat([data, packet_buf])
            }
            return data
        } else {
            const data = Buffer.alloc(0)
            data.writeUIntBE(0, 0, 1)
            return data
        }
    }
}
module.exports = JTT808Body8800
