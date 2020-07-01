const iconv = require('iconv-lite')
class JTT809Body1504 {

    decode(data) {
        const traveldata_length = data.readUIntBE(0, 4)
        console.log(data);
        
        return {
            'traveldata_info': data.toString('hex', 4, 4 + traveldata_length),
        }
    }
    encode(params) {
        const { traveldata_info } = params
        const traveldata_info_buf = Buffer.from(traveldata_info, 'hex')
        let info_length_buf = Buffer.alloc(4);
        info_length_buf.writeUIntBE(traveldata_info_buf.length, 0, 4)
        return Buffer.concat([info_length_buf, traveldata_info_buf])
    }

}
module.exports = JTT809Body1504
