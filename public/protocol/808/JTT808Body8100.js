const iconv = require('iconv-lite')

class JTT808Body8100 {

    body = {
        "flow_number": 3136,
        "result": 0,
        "authentication_code": "1234567890A"
    }

    decode(data) {
        return {
            'flow_number': data.readUIntBE(0, 2),
            'result': data.readUIntBE(2, 1),
            'authentication_code': iconv.decode(data.slice(3), 'gbk'),
        }
    }

    encode(params) {
        const { flow_number, result, authentication_code } = params
        let data = Buffer.alloc(3)
        data.writeUIntBE(flow_number, 0, 2)
        data.writeUInt8(result, 2)
        const authentication_code_buf = iconv.encode(authentication_code, 'gbk')
        data = Buffer.concat([data, authentication_code_buf])
        return data
    }
}


module.exports = JTT808Body8100
