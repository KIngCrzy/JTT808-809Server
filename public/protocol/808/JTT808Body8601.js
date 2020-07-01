class JTT808Body8601 {
    body = {
        "list": [
            0,
            1
        ]
    }

    decode(data) {
        const list = []
        const number = data.readUIntBE(0, 1)
        for (let i = 0; i < number; i += 1) {
            const result = data.readUIntBE(i * 4 + 1, 4)
            list.push(result)
        }
        return {
            'number': number,
            'list': list
        }
    }

    encode(params) {
        let data
        const { list } = params

        if (list) {
            const list_len = list.length * 4 + 1
            data = Buffer.alloc(list_len)
            data.writeUIntBE(list.length, 0, 1)
            for (let i = 0; i < list.length; i++) {
                data.writeUIntBE(list[i], i * 4 + 1, 4)
            }
        } else {
            data = Buffer.alloc(0)
            data.writeUIntBE(data, 0, 1)
        }
        return data
    }
}
module.exports = JTT808Body8601
