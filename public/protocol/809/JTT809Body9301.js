const iconv = require('iconv-lite')
class JTT809Body9301 {

    decode(data) {
        const info_length = data.readUIntBE(4, 4)
        return {
            'info_id': data.readUIntBE(0, 4),
            'info_content': iconv.decode(data.slice(8, 8 + info_length), 'gbk').replace(/\u0000/g, ''),
        }
    }

    encode(params) {
        const { info_id, info_content } = params
        const info_id_buf = Buffer.alloc(4)
        const info_content_length_buf = Buffer.alloc(4)

        info_id_buf.writeUIntBE(info_id, 0, 4)
        const info_content_buf = iconv.encode(info_content, 'gbk')
        info_content_length_buf.writeUIntBE(info_content_buf.length, 0, 4)
        const body = Buffer.concat([info_id_buf, info_content_length_buf, info_content_buf])
        return body
    }

}
module.exports = JTT809Body9301
