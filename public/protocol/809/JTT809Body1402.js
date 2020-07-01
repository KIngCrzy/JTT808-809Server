const iconv = require('iconv-lite')
class JTT809Body1402 {

    decode(data) {
        const info_length = data.readUIntBE(15, 4)
        return {
            'warn_src': data.toString('hex', 0, 1),
            'warn_type': data.toString('hex', 1, 3),
            'warn_time': Number(data.readBigUInt64BE(3, 8)),
            'info_id': data.readUIntBE(11, 4),
            'info_content': iconv.decode(data.slice(19, 19 + info_length), 'gbk').replace(/\u0000/g, ''),
        }
    }

    encode(params) {
        const { warn_src, warn_type, warn_time, info_id, info_content } = params
        const warn_src_buf = Buffer.from(warn_src, 'hex')
        const warn_type_buf = Buffer.from(warn_type, 'hex')
        let warn_time_buf = Buffer.alloc(8);
        let info_id_buf = Buffer.alloc(4);
        warn_time_buf.writeBigUInt64BE(BigInt(warn_time), 0, 8)
        info_id_buf.writeUIntBE(info_id, 0, 4)

        let info_content_length_buf = Buffer.alloc(4);
        const info_content_buf = (iconv.encode(info_content, 'gbk'))
        info_content_length_buf.writeUIntBE(info_content_buf.length, 0, 4)

        return Buffer.concat([warn_src_buf, warn_type_buf, warn_time_buf, info_id_buf, info_content_length_buf, info_content_buf])
    }

}
module.exports = JTT809Body1402
