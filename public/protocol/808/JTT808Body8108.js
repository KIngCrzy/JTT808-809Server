const iconv = require('iconv-lite')

class JTT808Body8108 {

    body = {
        "upgrade_type": 0,
        "manufacturer_id": "12345",
        "version_number": "1",
        "upgrade_pack": "020000280123456789010215000000000004000301d2dc260633e70d02ac0000013b20011910555431010830012001040000111bdf"
    }

    decode(data) {
        const upgrade_type = data.readUIntBE(0, 1)
        const manufacturer = iconv.decode(data.slice(1, 6), 'gbk')
        const n = data.readUIntBE(6, 1)
        const version_number = iconv.decode(data.slice(7, 7 + n), 'gbk')
        const m = data.readUIntBE(7 + n, 4)
        const upgrade_pack = data.slice(11 + n).toString('hex')
        return {
            'upgrade_type': upgrade_type,
            'manufacturer_id': manufacturer,
            'version_number': version_number,
            'upgrade_pack': upgrade_pack,
        }
    }

    encode(params) {
        const { upgrade_type, manufacturer_id, version_number, upgrade_pack } = params
        let data
        if (manufacturer_id.length === 5) {
            data = Buffer.alloc(1)
            data.writeUIntBE(upgrade_type, 0, 1)
            const manufacturer_id_buf = iconv.encode(manufacturer_id, 'gbk')
            const version_number_buf = iconv.encode(version_number, 'gbk')

            const version_number_len_buf = Buffer.alloc(1)
            version_number_len_buf.writeUIntBE(version_number_buf.length, 0, 1)

            const upgrade_pack_buf = Buffer.from(upgrade_pack, 'hex')
            const upgrade_pack_len_buf = Buffer.alloc(4)
            upgrade_pack_len_buf.writeUIntBE(upgrade_pack_buf.length, 0, 4)

            data = Buffer.concat([data, manufacturer_id_buf, version_number_len_buf, version_number_buf,
                upgrade_pack_len_buf, upgrade_pack_buf])
        }
        return data
    }
}

module.exports = JTT808Body8108
