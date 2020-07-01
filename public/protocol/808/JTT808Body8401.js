const iconv = require('iconv-lite')

class JTT808Body8401 {
    body = {
        "type": 1,
        "contacts": [
            {
                "flag": 1,
                "phone_number": "12345678901",
                "name": "老板"
            },
            {
                "flag": 2,
                "phone_number": "12345678902",
                "name": "大队长"
            },
            {
                "flag": 3,
                "phone_number": "12345678903",
                "name": "小队长"
            },
            {
                "flag": 4,
                "phone_number": "12345678903",
                "name": "小队长"
            }
        ]
    }


    decode(data) {
        let flag = []
        const number_len = []
        const number = []
        let name_len = []
        const name = []

        const type = data.readUIntBE(0, 1)
        const total = data.readUIntBE(1, 1)

        const list = []
        const result = {
            'flag': null,
            'phone_number': null,
            'name': null
        }
        flag[0] = data.readUIntBE(2, 1)
        number_len[0] = data.readUIntBE(3, 1)
        number[0] = iconv.decode(data.slice(4, number_len[0] + 4), 'gbk')
        name_len[0] = data.readUIntBE(4 + number_len[0], 1)
        name[0] = iconv.decode(data.slice(number_len[0] + 5, number_len[0] + 5 + name_len[0]), 'gbk')
        result.flag = flag[0]
        result.phone_number = number[0]
        result.name = name[0]
        list.push(result)

        const data_buf = data.slice(5 + number_len[0] + name_len[0])
        let length = 0

        for (let i = 1; i < total; i += 1) {
            const result = {
                'flag': null,
                'phone_number': null,
                'name': null
            }
            result.flag = data_buf.readUIntBE(0 + length, 1)
            const number_len = data_buf.readUIntBE(1 + length, 1)
            result.phone_number = iconv.decode(data_buf.slice(2 + length, 2 + length + number_len), 'gbk')
            const name_len = data_buf.readUIntBE(2 + number_len + length, 1)
            result.name = iconv.decode(data_buf.slice(3 + length + number_len, 3 + length + number_len + name_len), 'gbk')
            list.push(result)
            length = length + 3 + name_len + number_len
        }

        return {
            "type": type,
            "total": total,
            "contacts": list
        }
    }


    encode(params) {
        const { type, contacts } = params
        let data = Buffer.alloc(2)
        const phone_number_bytes = Buffer.alloc(1)
        const name_len_buf = Buffer.alloc(1)
        const flag_buf = Buffer.alloc(1)

        data.writeUIntBE(type, 0, 1)
        if (contacts) {
            data.writeUIntBE(contacts.length, 1, 1)
            for (let i = 0; i < contacts.length; i++) {
                const { flag, phone_number, name } = contacts[i]
                // # 标志
                flag_buf.writeUIntBE(flag, 0, 1)
                const phone_number_buf = iconv.encode(phone_number, 'gbk')
                phone_number_bytes.writeUInt8(phone_number_buf.length, 0)
                const name_buf = iconv.encode(name, 'gbk')
                name_len_buf.writeUInt8(name_buf.length, 0)
                data = Buffer.concat([data, flag_buf, phone_number_bytes, phone_number_buf,
                    name_len_buf, name_buf])
            }
            return data
        }
        else {
            data = Buffer.alloc(1)
            data.writeUInt8(0, 0)
            return data
        }
    }
}
module.exports = JTT808Body8401
