const iconv = require('iconv-lite')

class JTT808Body0100 {
    body = {
        'province_id': 34,
        'city_id': 1102,
        'manufacturer_id': '70444',
        'terminal_model': 'XM-GT09-808',
        'terminal_id': '1352348',
        'plate_color': 2,
        'plate_number': '粤B31719',
    }

    decode(data) {
        return {
            'province_id': data.readUIntBE(0, 2),
            'city_id': data.readUIntBE(2, 2),
            'manufacturer_id': iconv.decode(data.slice(4, 9), 'gbk'),
            'terminal_model': iconv.decode(data.slice(9, 29), 'gbk').replace(/\u0000/g, ''),
            'terminal_id': iconv.decode(data.slice(29, 36), 'gbk'),
            'plate_color': data.readUIntBE(36, 1),
            'plate_number': iconv.decode(data.slice(37), 'gbk')
        }
    }

    encode(params) {
        let data = Buffer.alloc(37)
        const {
            province_id, city_id, manufacturer_id,
            terminal_model, terminal_id, plate_color, plate_number,
        } = params
        data.writeUIntBE(province_id, 0, 2)
        data.writeUIntBE(city_id, 2, 2)

        const manufacturer_id_buf = iconv.encode(manufacturer_id, 'gbk')
        const terminal_model_buf = iconv.encode(terminal_model, 'gbk')
        const terminal_id_buf = iconv.encode(terminal_id, 'gbk')
        data.write(manufacturer_id_buf.toString('hex'), 4, 9, 'hex')
        data.write(terminal_model_buf.toString('hex'), 9, 29, 'hex')
        data.write(terminal_id_buf.toString('hex'), 29, 36, 'hex')
        data.writeUIntBE(plate_color, 36, 1)
        const plate_number_buf = iconv.encode(plate_number, 'gbk')

        data = Buffer.concat([data, plate_number_buf])
        return data
    }
}
module.exports = JTT808Body0100
