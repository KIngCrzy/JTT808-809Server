const iconv = require('iconv-lite')
class JTT809Body1302 {

    decode(data) {
        return {
            'info_id': data.readUIntBE(0, 4),
        }
    }

    encode(params) {
        const { info_id } = params
        const info_id_buf = Buffer.alloc(4)
        info_id_buf.writeUIntBE(info_id, 0, 4)
        return info_id_buf
    }

}
module.exports = JTT809Body1302
