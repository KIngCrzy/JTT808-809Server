const iconv = require('iconv-lite')
class JTT809Body1201 {

    decode(data) {
        return {
            'platform_id': iconv.decode(data.slice(0, 11), 'gbk').replace(/\u0000/g, ''),
            'producer_id': iconv.decode(data.slice(11, 22), 'gbk').replace(/\u0000/g, ''),
            'terminal_model_type': iconv.decode(data.slice(22, 30), 'gbk').replace(/\u0000/g, ''),
            'terminal_id': iconv.decode(data.slice(30, 37), 'gbk').replace(/\u0000/g, ''),
            'terminal_simcode': iconv.decode(data.slice(37, 49), 'gbk').replace(/\u0000/g, ''),
        }
    }

    encode(params) {
        const { platform_id, producer_id, terminal_model_type, terminal_id, terminal_simcode } = params
        const data = Buffer.alloc(49)
        data.write(iconv.encode(platform_id, 'gbk').toString('hex'), 0, 11, 'hex')
        data.write(iconv.encode(producer_id, 'gbk').toString('hex'), 11, 22, 'hex')
        data.write(iconv.encode(terminal_model_type, 'gbk').toString('hex'), 22, 30, 'hex')
        data.write(iconv.encode(terminal_id, 'gbk').toString('hex'), 30, 37, 'hex')
        data.write(iconv.encode(terminal_simcode, 'gbk').toString('hex'), 37, 49, 'hex')

        return data
    }

}
module.exports = JTT809Body1201
