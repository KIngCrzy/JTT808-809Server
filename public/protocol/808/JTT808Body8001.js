class JTT808Body8001 {
    body = {
        "flow_number": 3136,
        "message_id": "0102",
        "result": 0
    }

    decode(data) {
        return {
            'flow_number': data.readUIntBE(0, 2),
            'message_id': data.toString('hex', 2, 4),
            'result': data.readUIntBE(4, 1),
        }
    }

    encode(params) {
        const { flow_number, message_id, result } = params
        const data = Buffer.alloc(2)
        data.writeUIntBE(flow_number, 0, 2)
        const message_id_buf = Buffer.from(message_id, 'hex')
        const result_buf_buf = Buffer.alloc(1)
        result_buf_buf.writeUIntBE(result, 0, 1)
        return Buffer.concat([data, message_id_buf, result_buf_buf])
    }
}
module.exports = JTT808Body8001
