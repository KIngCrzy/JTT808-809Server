const iconv = require('iconv-lite')


class JTT808Body0107 {
    body = {
        "terminal_type": {
            "passenger_vehicle": 1,
            "dangerous_vehicle": 0,
            "freight_vehicle": 1,
            "rental_vehicle": 0,
            "disk_record": 0,
            "split_machine": 0
        },
        "manufacturer_id": "12345",
        "terminal_model": "AB123456",
        "terminal_id": "A112233",
        "sim_iccid": "12345678901234567890",
        "hardware_version": "1",
        "firmware_version": "1",
        "gnss_properties": {
            "gps_positioning": 0,
            "beidou_positioning": 0,
            "glonass_positioning": 0,
            "galileo_positioning": 0
        },
        "comm_properties": {
            "gprs": 0,
            "cdma": 0,
            "td_scdma": 0,
            "wcdma": 0,
            "cdma2000": 0,
            "td_lte": 0,
            "other": 0
        }
    }

    _is_1(data, position) {
        const data_len = data.length
        if (position / 8 >= data_len) {
            throw 'Position cannot be out of bound'
        }
        return (data[data_len - 1 - position / 8] >> (position % 8)) & 0b1
    }

    decode(data) {
        const terminal_type_data = data.slice(0, 2)
        const terminal_type = {
            'passenger_vehicle': this._is_1(terminal_type_data, 0),
            'dangerous_vehicle': this._is_1(terminal_type_data, 1),
            'freight_vehicle': this._is_1(terminal_type_data, 2),
            'rental_vehicle': this._is_1(terminal_type_data, 3),
            'disk_record': this._is_1(terminal_type_data, 6),
            'split_machine': this._is_1(terminal_type_data, 7)
        }
        const manufacturer_id = iconv.decode(data.slice(2, 7), 'gbk')
        const terminal_model = iconv.decode(data.slice(7, 27), 'gbk').replace(/\u0000/g, '')
        const terminal_id = iconv.decode(data.slice(27, 34), 'gbk')
        const sim_iccid = data.toString('hex', 34, 44)
        const n = data.readUIntBE(44, 1)
        const hardware_version = iconv.decode(data.slice(45, 45 + n), 'gbk')
        const m = data.readUIntBE(45 + n, 1)
        const firmware_version = iconv.decode(data.slice(46 + n, 46 + n + m), 'gbk')
        const gnss_properties = {
            'gps_positioning': data[46 + n + m] & 0b00000001,
            'beidou_positioning': data[46 + n + m] & 0b00000010,
            'glonass_positioning': data[46 + n + m] & 0b00000100,
            'galileo_positioning': data[46 + n + m] & 0b00001000
        }

        const comm_properties = {
            'gprs': data[47 + n + m] & 0b00000001,
            'cdma': data[47 + n + m] & 0b00000010,
            'td_scdma': data[47 + n + m] & 0b00000100,
            'wcdma': data[47 + n + m] & 0b00001000,
            'cdma2000': data[47 + n + m] & 0b00010000,
            'td_lte': data[47 + n + m] & 0b00100000,
            'other': data[47 + n + m] & 0b10000000
        }
        return {
            'terminal_type': terminal_type,
            'manufacturer_id': manufacturer_id,
            'terminal_model': terminal_model,
            'terminal_id': terminal_id,
            'sim_iccid': sim_iccid,
            'hardware_version': hardware_version,
            'firmware_version': firmware_version,
            'gnss_properties': gnss_properties,
            'comm_properties': comm_properties
        }
    }

    encode(params) {
        const { terminal_type, manufacturer_id, terminal_model, terminal_id,
            sim_iccid, hardware_version, firmware_version, gnss_properties, comm_properties } = params
        let data_buf = Buffer.alloc(2)

        const { passenger_vehicle, dangerous_vehicle, freight_vehicle, rental_vehicle, disk_record, split_machine } = terminal_type
        const { gps_positioning, beidou_positioning, glonass_positioning, galileo_positioning, } = gnss_properties
        const { gprs, cdma, td_scdma, wcdma, cdma2000, td_lte, other } = comm_properties

        let terminal_type_buf = 0b00000000

        if (passenger_vehicle === 1) { terminal_type_buf |= 0b00000001 }
        if (dangerous_vehicle === 1) { terminal_type_buf |= 0b00000010 }
        if (freight_vehicle === 1) { terminal_type_buf |= 0b00000100 }
        if (rental_vehicle === 1) { terminal_type_buf |= 0b00001000 }
        if (disk_record === 1) { terminal_type_buf |= 0b01000000 }
        if (split_machine === 1) { terminal_type_buf |= 0b10000000 }

        data_buf.writeUIntBE(terminal_type_buf, 0, 2)


        const manufacturer_id_buf = iconv.encode(manufacturer_id, 'gbk')

        const terminal_model_buf = iconv.encode(terminal_model, 'gbk')

        const terminal_model_len_buf = Buffer.alloc(20 - terminal_model_buf.length)
        const terminal_model_buf_buf = Buffer.concat([terminal_model_buf, terminal_model_len_buf])

        const terminal_id_buf = iconv.encode(terminal_id, 'gbk')
        const terminal_id_buf_len_buf = Buffer.alloc(7 - terminal_id_buf.length)
        const terminal_id_buf_buf = Buffer.concat([terminal_id_buf, terminal_id_buf_len_buf])

        const sim_iccid_buf = Buffer.from(sim_iccid, 'hex')

        data_buf = Buffer.concat([data_buf, manufacturer_id_buf, terminal_model_buf_buf, terminal_id_buf_buf, sim_iccid_buf])
        // console.log('data_buf99', data_buf)

        const hardware_version_buf = iconv.encode(hardware_version, 'gbk')
        const hardware_version_len_buf = Buffer.alloc(1)
        hardware_version_len_buf.writeUIntBE(hardware_version_buf.length, 0, 1)

        const firmware_version_buf = iconv.encode(firmware_version, 'gbk')
        const firmware_version_len_buf = Buffer.alloc(1)
        firmware_version_len_buf.writeUIntBE(firmware_version_buf.length, 0, 1)

        const gnss_properties_comm_properties_buf = Buffer.alloc(2)


        let gnss_properties_buf = 0b00000000
        let comm_properties_buf = 0b00000000

        if (gps_positioning === 1) { gnss_properties_buf |= 0b00000001 }
        if (beidou_positioning === 1) { gnss_properties_buf |= 0b00000010 }
        if (glonass_positioning === 1) { gnss_properties_buf |= 0b00000100 }
        if (galileo_positioning === 1) { gnss_properties_buf |= 0b00001000 }

        if (gprs === 1) { comm_properties_buf |= 0b00000001 }
        if (cdma === 1) { comm_properties_buf |= 0b00000010 }
        if (td_scdma === 1) { comm_properties_buf |= 0b00000100 }
        if (wcdma === 1) { comm_properties_buf |= 0b00001000 }
        if (cdma2000 === 1) { comm_properties_buf |= 0b00010000 }
        if (td_lte === 1) { comm_properties_buf |= 0b00100000 }
        if (other === 1) { comm_properties_buf |= 0b10000000 }

        gnss_properties_comm_properties_buf.writeUIntBE(gnss_properties_buf, 0, 1)
        gnss_properties_comm_properties_buf.writeUIntBE(comm_properties_buf, 1, 1)

        data_buf = Buffer.concat([data_buf, hardware_version_len_buf, hardware_version_buf, firmware_version_len_buf,
            firmware_version_buf, gnss_properties_comm_properties_buf
        ])
        return data_buf
    }
}

module.exports = JTT808Body0107
