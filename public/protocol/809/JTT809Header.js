// import AbstractProtocol from './AbstractProtocol'
const { crc16ccitt } = require('crc')

class JTT809Header {
    encrypt(key, buffer) {
        const ia1 = 2000000
        const m1 = 1000000
        const ic1 = 3000000
        const size = buffer.length

        let index = 0
        if (key === 0) {
            key = 1
        }

        while (index < size) {
            key = (ia1 * (key % m1) + ic1) > 4294967295 ? Buffer.from((ia1 * (key % m1) + ic1).toString(16).slice(-8), 'hex').readUInt32BE(0) : (ia1 * (key % m1) + ic1)

            buffer[index] ^= ((key >> 20) & 0xff)
            index += 1

        }
        return buffer
    }

    decrypt(key, data) {
        return this.encrypt(key, data)

    }

    fill(data) {
        return Buffer.concat([data, Buffer.from(crc16ccitt(data).toString(16).padStart(4, 0), 'hex')])
    }

    validate(data) {
        const crc_code = data.slice(-2).toString('hex')
        return crc_code === crc16ccitt(data.slice(0, -2)).toString(16).padStart(4, 0)
    }

    escape(data) {
        const array = []
        for (let index = 0; index < data.length; index++) {
            let element = data[index].toString('16').padStart(2, '0');
            array.push(element)
        }
        const escape_array = array.map(x => {
            switch (x) {
                case '5a':
                    return '5a02'
                case '5b':
                    return '5a01'
                case '5e':
                    return '5e02'
                case '5d':
                    return '5e01'
                default:
                    return x
            }
        })
        const escape_buf_array = escape_array.map(x => {
            return Buffer.from(x, 'hex')

        })
        return Buffer.concat(escape_buf_array)
    }

    unescape(data) {
        const array = []
        for (let index = 0; index < data.length; index++) {
            let element = data[index].toString('16').padStart(2, '0');
            array.push(element)
        }
        for (let index = 0; index < array.length; index++) {
            if (array[index] === '5e' && array[index + 1] === '01') {
                array[index] = '5d'
                array.splice(index + 1, 1)
            }
            if (array[index] === '5e' && array[index + 1] === '02') {
                array[index] = '5e'
                array.splice(index + 1, 1)
            }
            if (array[index] === '5a' && array[index + 1] === '01') {
                array[index] = '5b'
                array.splice(index + 1, 1)
            }
            if (array[index] === '5a' && array[index + 1] === '02') {
                array[index] = '5a'
                array.splice(index + 1, 1)
            }
        }
        const unescape_buf_array = array.map(x => {
            return Buffer.from(x, 'hex')

        })
        return Buffer.concat(unescape_buf_array)

    }

    decode(data) {
        return {
            'body_length': data.readUIntBE(0, 4),
            'serial_number': data.readUIntBE(4, 4),
            'message_id': data.toString('hex', 8, 10),
            'center_id': data.readUIntBE(10, 4),
            'version_flag': data.toString('hex', 14, 17),
            'encrypt_flag': data.readUIntBE(17, 1),
            'encrypt_key': data.readUIntBE(18, 4),
        }
    }

    encode(params) {
        let data = Buffer.alloc(22);
        const { body_length, serial_number, message_id, center_id, version_flag, encrypt_flag, encrypt_key } = params

        data.writeUIntBE(body_length + 26, 0, 4)
        data.writeUIntBE(serial_number, 4, 4)
        data.write(message_id, 8, 2, 'hex')
        data.writeUIntBE(center_id, 10, 4)
        data.write(version_flag, 14, 3, 'hex')
        if (encrypt_flag === 1) {
            data.writeUIntBE(1, 17, 1)
            data.writeUIntBE(encrypt_key, 18, 4)

        } else {
            data.writeUIntBE(0, 17, 5)
        }
        return data
    }
}

module.exports = JTT809Header
