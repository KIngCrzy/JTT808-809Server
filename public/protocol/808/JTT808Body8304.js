const iconv = require('iconv-lite')


class JTT808Body8304 {

    body = {
        "type": 1,
        "content": "15分钟后有暴雨"
    }

    decode(data) {
        return {
            'type': data.readUIntBE(0, 1),
            // 'content_length': data.readUIntBE(1, 2),
            'content': iconv.decode(data.slice(3), 'gbk')

        }
    }
    encode(params) {
        const { type, content } = params
        const content_buf = iconv.encode(content, 'gbk')
        let data = Buffer.alloc(3)
        data.writeUInt8(type, 0)
        data.writeUIntBE(content_buf.length, 1, 2)
        data = Buffer.concat([data, content_buf])
        return data
    }
}
module.exports = JTT808Body8304
