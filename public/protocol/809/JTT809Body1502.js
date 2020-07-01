const iconv = require('iconv-lite')
const JTT809body1202 = require('./JTT809Body1202')

const JTT809Body1202 = new JTT809body1202()
class JTT809Body1502 {

    decode(data) {
        const photo_len = data.readUIntBE(38, 4)

        const params = {
            'photo_rsp_flag': data.toString('hex', 0, 1),
            'gnss_data': JTT809Body1202.decode(data.slice(1, 37)),
            'lens_id': data.readUIntBE(37, 1),
            'size_type': data.toString('hex', 42, 43),
            'type': data.toString('hex', 43, 44),
            'photo': data.toString('hex', 44, 44 + photo_len),
        }
        return params
    }

    encode(params) {
        const { photo_rsp_flag, gnss_data, lens_id, size_type, type, photo } = params
        const photo_rsp_flag_buf = Buffer.from(photo_rsp_flag, 'hex')
        const gnss_data_buf = JTT809Body1202.encode(gnss_data)
        let lens_id_buf = Buffer.alloc(1);
        lens_id_buf.writeUIntBE(lens_id, 0, 1)

        const photo_buf = Buffer.from(photo, 'hex')
        let photo_len_buf = Buffer.alloc(4);
        photo_len_buf.writeUIntBE(photo_buf.length, 0, 4)

        const size_type_buf = Buffer.from(size_type, 'hex')
        const type_buf = Buffer.from(type, 'hex')

        return Buffer.concat([photo_rsp_flag_buf, gnss_data_buf, lens_id_buf, photo_len_buf, size_type_buf, type_buf, photo_buf])
    }

}
module.exports = JTT809Body1502
