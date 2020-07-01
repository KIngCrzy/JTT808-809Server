const iconv = require('iconv-lite')
class JTT809Body1401 {

    decode(data) {
        return {
            'supervision_id': data.readUIntBE(0, 4),
            'result': data.toString('hex', 4, 5),
        }
    }

    encode(params) {
        const { supervision_id, result } = params

        let supervision_id_buf = Buffer.alloc(4);
        supervision_id_buf.writeUIntBE(supervision_id, 0, 4)
        const result_buf = Buffer.from(result, 'hex')

        return Buffer.concat([supervision_id_buf, result_buf])

    }

}
module.exports = JTT809Body1401
