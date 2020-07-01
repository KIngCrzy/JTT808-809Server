const iconv = require('iconv-lite')
class JTT809Body1207 {
    decode(data) {
        return {
            'start_time': Number(data.readBigUInt64BE(0, 8)),
            'end_time': Number(data.readBigUInt64BE(8, 8))
        }
    }

    encode(params) {
        const { start_time, end_time } = params
        const data = Buffer.alloc(16)
        data.writeBigUInt64BE(BigInt(start_time), 0, 8)
        data.writeBigUInt64BE(BigInt(end_time), 8, 8)
        return data
    }

}
module.exports = JTT809Body1207
