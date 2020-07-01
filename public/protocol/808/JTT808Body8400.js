const iconv = require('iconv-lite')

class JTT808Body8400 {
    body = {
        "flag": 1,
        "phone_number": "12345678901"
    }

    decode(data) {
        return {
            'flag': data.readUIntBE(0, 1),
            'phone_number': iconv.decode(data.slice(1), 'gbk')
        }
    }

    encode(params) {
        const { flag, phone_number } = params
        const data = Buffer.alloc(1)
        data.writeUInt8(flag, 0)
        const phone_number_buf = iconv.encode(phone_number, 'gbk')
        return Buffer.concat([data, phone_number_buf])
    }
}
module.exports = JTT808Body8400
