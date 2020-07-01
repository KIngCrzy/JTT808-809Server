const iconv = require('iconv-lite')
class JTT809Body120b {

    decode(data) {
        return {
            'ewaybill_info': iconv.decode(data.slice(4), 'gbk')
        }
    }

    encode(params) {
        const { ewaybill_info } = params
        const ewaybill_info_buf = iconv.encode(ewaybill_info, 'gbk')
        const info_length_buf = Buffer.alloc(4)
        info_length_buf.writeUIntBE(ewaybill_info_buf.length, 0, 4)
        return Buffer.concat([info_length_buf, ewaybill_info_buf])
    }

}
module.exports = JTT809Body120b
