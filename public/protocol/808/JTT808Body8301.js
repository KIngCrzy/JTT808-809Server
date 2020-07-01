const iconv = require('iconv-lite')
class JTT808Body8301 {

    body = {
        "type": 2,
        "list": [
            {
                "id": 1,
                "content": "汽车抛锚"
            },
            {
                "id": 2,
                "content": "司机受伤"
            },
            {
                "id": 3,
                "content": "司机受伤"
            }
        ]
    }


    decode(data) {
        let id = []
        const content_len = []
        let content = []
        const type = data.readUIntBE(0, 1)
        const total = data.readUIntBE(1, 1)

        const list = []
        const result = {
            'id': null,
            'content': null
        }
        content_len[0] = data.readUIntBE(3, 1)
        id[0] = data.readUIntBE(2, 1)

        content[0] = iconv.decode(data.slice(4, content_len[0] + 4), 'gbk')
        result.id = id[0]
        result.content = content[0]
        list.push(result)

        if (total > 1) {
            for (let i = 1; i < total; i += 1) {
                const result = {
                    'id': null,
                    'content': null
                }
                id[i] = data.readUIntBE(2 + (2 + content_len[i - 1]) * i, 1)
                content_len[i] = data.readUIntBE(3 + (2 + content_len[i - 1]) * i, 1)
                content[i] = iconv.decode(data.slice(4 + (2 + content_len[i - 1]) * i, 4 + (2 + content_len[i - 1]) * i + content_len[i]), 'gbk')
                result.id = id[i]
                result.content = content[i]
                list.push(result)
            }
        }

        return {
            'type': type,
            'total': total,
            'list': list
        }
    }

    encode(params) {
        let data = Buffer.alloc(2)
        const { type, list } = params
        data.writeUInt8(type, 0)
        if (type != 0) {
            data.writeUInt8(list.length, 1)
            let id_buf = Buffer.alloc(1)
            for (let i = 0; i < list.length; i++) {
                const { id, content } = list[i]
                id_buf.writeUInt8(id, 0)
                data = Buffer.concat([data, id_buf])
                if (type != 4) {
                    const content_buf = iconv.encode(content, 'gbk')
                    const content_buf_len = Buffer.alloc(1)
                    content_buf_len.writeUIntBE(content_buf.length, 0, 1)
                    data = Buffer.concat([data, content_buf_len, content_buf])
                } else {
                    data = Buffer.concat([data, '0x00'])
                }
            }
        }
        return data
    }
}
module.exports = JTT808Body8301
