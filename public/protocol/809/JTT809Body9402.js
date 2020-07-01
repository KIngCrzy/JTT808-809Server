const iconv = require('iconv-lite')
class JTT809Body9402 {

    decode(data) {
        const warn_length = data.readUIntBE(11, 4)
        return {
            'warn_src': data.toString('hex', 0, 1),
            'warn_type': data.toString('hex', 1, 3),
            'warn_time': Number(data.readBigUInt64BE(3, 8)),
            'warn_content': iconv.decode(data.slice(15, 15 + warn_length), 'gbk').replace(/\u0000/g, ''),

        }
    }

    encode(params) {
        const { warn_src, warn_type, warn_time, warn_content } = params
        const warn_src_buf = Buffer.from(warn_src, 'hex')
        const warn_type_buf = Buffer.from(warn_type, 'hex')
        let warn_time_buf = Buffer.alloc(8);
        let warn_content_length_buf = Buffer.alloc(4);
        warn_time_buf.writeBigUInt64BE(BigInt(warn_time), 0, 8)
        const warn_content_buf = (iconv.encode(warn_content, 'gbk'))
        warn_content_length_buf.writeUIntBE(warn_content_buf.length, 0, 4)

        return Buffer.concat([warn_src_buf, warn_type_buf, warn_time_buf, warn_content_length_buf, warn_content_buf])
    }

}
module.exports = JTT809Body9402
