class JTT808Body0805 {

    body = {
        "flow_number": 3136,
        "result": 0,
        "id_list": [
            1,
            2,
            3
        ]
    }

    decode(data) {
        const flow_number = data.readUIntBE(0, 2)
        const result = data[2]
        let id_list = null
        if (result === 0) {
            id_list = []
            const n = data.readUIntBE(3, 2)
            for (let i = 0; i < n; i += 1) {
                const result = data.readUIntBE(5 + 4 * i, 4)
                id_list.push(result)
            }
        }
        return {
            'flow_number': flow_number,
            'result': result,
            'id_list': id_list
        }
    }

    encode(params) {
        console.log('params', params)
        const { flow_number, result, id_list } = params
        let data = Buffer.alloc(5)
        let id_list_buf = Buffer.alloc(id_list.length * 4)
        data.writeUIntBE(flow_number, 0, 2)
        data.writeUIntBE(result, 2, 1)
        data.writeUIntBE(id_list.length, 3, 2)
        for (let i = 0; i < id_list.length; i += 1) {
            id_list_buf.writeUIntBE(id_list[i], i * 4, 4)
        }
        data = Buffer.concat([data, id_list_buf])
        return data
    }
}

module.exports = JTT808Body0805
