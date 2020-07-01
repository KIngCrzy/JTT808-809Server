class JTT808Body8003 {

    body = {
        "flow_number": 3136,
        "packets_id_list": [
            1,
            2,
            3
        ]
    }

    decode(data) {
        console.log('data', data)
        const flow_number = data.readUIntBE(0, 2)
        const n = data.readUIntBE(2, 1)
        const id_list = []
        for (let i = 0; i < n; i += 1) {
            const result = data.readUIntBE(3 + 2 * i, 2)
            console.log(result)
            id_list.push(result)
        }
        return {
            'flow_number': flow_number,
            'id_list': id_list
        }
    }


    encode(params) {
        const { flow_number, packets_id_list } = params
        const packets_num = packets_id_list.length
        const data = Buffer.alloc(3 + 2 * packets_num)
        data.writeUIntBE(flow_number, 0, 2)
        data.writeUIntBE(packets_num, 2, 1)
        for (let i = 0; i < packets_num; i += 1) {
            data.writeUIntBE(packets_id_list[i], 3 + 2 * i, 2)
        }
        return data
    }
}
module.exports = JTT808Body8003
