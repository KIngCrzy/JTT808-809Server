const iconv = require('iconv-lite')
class JTT809Body1503 {

    decode(data) {
        return {
            'msg_id': data.readUIntBE(0, 4),
            'result': data.toString('hex', 4, 5),
        }
    }

    encode(params) {
        const { msg_id, result } = params
        let msg_id_buf = Buffer.alloc(4);
        msg_id_buf.writeUIntBE(msg_id, 0, 4)
        const result_buf = Buffer.from(result, 'hex')
        return Buffer.concat([msg_id_buf, result_buf])
    }
}
module.exports = JTT809Body1503
