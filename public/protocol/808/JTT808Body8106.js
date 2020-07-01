class JTT808Body8106 {

    body = {
        'total': 2,
        "id_list": [
            "0001",
            "0002"
        ]
    }

    decode(data) {
        const total = data.readUIntBE(0, 1)
        const id_list = []
        for (let i = 0; i < total; i += 1) {
            id_list.push(data.slice(1 + i * 4, 5 + i * 4).slice(2, 4).toString('hex'))
        }
        return {
            'total': total,
            'id_list': id_list
        }
    }
    encode(params) {
        const { total, id_list } = params
        let data = Buffer.alloc(1)
        data.writeUIntBE(total, 0, 1)
        for (let i = 0; i < total; i += 1) {
            data = Buffer.concat([data, Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(id_list[i], 'hex')])])
        }
        return data
    }
}

module.exports = JTT808Body8106
