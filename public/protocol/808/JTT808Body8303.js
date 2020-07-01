const iconv = require('iconv-lite')

class JTT808Body8303 {
    body = {
        "type": 2,
        "total": 3,
        'list': [
            {
                "id": 1,
                "name": "天气信息"
            },
            {
                "id": 2,
                "name": "拥堵信息"
            },
            {
                "id": 3,
                "name": "拥堵信息"
            }
        ]
    }

    decode(data) {
        console.log(data)
        let id = []
        const content_len = []
        let content = []
        const type = data.readUIntBE(0, 1)
        const total = data.readUIntBE(1, 1)

        const list = []
        const result = {
            'id': null,
            'length': null,
            'content': null
        }

        id[0] = data.readUIntBE(2, 1)
        content_len[0] = data.readUIntBE(3, 2)
        content[0] = iconv.decode(data.slice(5, content_len[0] + 5), 'gbk')
        result.id = id[0]
        result.length = content_len[0]
        result.content = content[0]
        console.log(content_len[0])
        list.push(result)

        if (total > 1) {
            for (let i = 1; i < total; i += 1) {
                const result = {
                    'id': null,
                    'length': null,
                    'content': null
                }
                id[i] = data.readUIntBE(2 + (3 + content_len[i - 1]) * i, 1)
                content_len[i] = data.readUIntBE(3 + (3 + content_len[i - 1]) * i, 2)
                content[i] = iconv.decode(data.slice(5 + (3 + content_len[i - 1]) * i, 5 + (3 + content_len[i - 1]) * i + content_len[i]), 'gbk')
                result.id = id[i]
                result.length = content_len[i]
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
        const { type, list } = params
        let data = Buffer.alloc(1)
        data.writeUInt8(type, 0)
        if (list) {
            const list_len_buf = Buffer.alloc(1)
            const collect_buf = Buffer.alloc(1)
            const name_len_buf = Buffer.alloc(2)
            const total = list.length
            list_len_buf.writeUInt8(total, 0)
            data = Buffer.concat([data, list_len_buf])

            for (let i = 0; i < total; i += 1) {
                const { id, name } = list[i]
                collect_buf.writeUInt8(id, 0)
                const name_buf = iconv.encode(name, 'gbk')
                name_len_buf.writeUIntBE(name_buf.length, 0, 2)
                data = Buffer.concat([data, collect_buf, name_len_buf, name_buf])
            }
            return data
        } else {
            data.writeUInt8(0, 0)
            return data
        }
    }
}
module.exports = JTT808Body8303
