const iconv = require('iconv-lite')

class JTT808Body8103 {
    body = {
        "params_list": [
            {
                "param_id": "0001",
                "param_value": 10
            },
            {
                "param_id": "0110",
                "param_value": 1
            }
        ]
    }

    decode(data) {
        const total_params = data.readUIntBE(0, 1)
        console.log('total_params', total_params)
        const params_list = []
        let index = 1
        const arr = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0018', '0019', '0020',
            '0021', '0022', '0027', '0028', '0029', '002c', '002d', '002e', '002f', '0030',
            '0045', '0046', '0047', '0050', '0051', '0052', '0053', '0054', '0055', '0056',
            '0057', '0058', '0059', '005a', '0070', '0071', '0072', '0073', '0074', '0080']

        const arr1 = ['0010', '0011', '0012', '0013', '0014', '0015', '0016', '0017', '0040', '0041',
            '0042', '0043', '0044', '0048', '0049', '0083']

        const arr2 = [
            '0031', '005b', '005c', '005d', '005e', '0081', '0082', '0101', '0103'
        ]
        for (let i = 0; i < total_params; i += 1) {
            let result = data.toString('hex', index, index + 4)
            console.log('result', result)
            const param_id = result.slice(4)
            console.log('param_id', param_id)
            if (arr.includes(param_id)) {
                const param_value = data.readUIntBE(index + 5, 4)
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 9
            } else if (arr1.includes(param_id)) {
                const param_length = data.readUIntBE(index + 4, 1)
                const param_value = iconv.decode(data.slice(index + 5, index + 5 + param_length), 'gbk')
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 5 + param_length
            } else if (arr2.includes(param_id)) {
                const param_value = data.readUIntBE(index + 5, 2)
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 7
            } else if (['0084', '0090', '0091', '0092', '0094'].includes(param_id)) {
                const param_value = data.readUIntBE(index + 5, 1)
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 6

            } else if (param_id === '0110') {
                const param_value = Number(data.readBigUInt64BE(index + 5, 8))
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 13
            }
        }
        return params_list
    }
    encode(params) {
        let data = Buffer.alloc(1)
        const { params_list } = params
        const params_list_len = params_list.length
        data.writeUInt8(params_list_len, 0)
        const arr = [
            '0001', '0002', '0003', '0004', '0005', '0006', '0007', '0018', '0019',
            '0020', '0021', '0022', '0027', '0028', '0029', '002c', '002d', '002e',
            '002f', '0030', '0045', '0046', '0047', '0050', '0051', '0052', '0053',
            '0054', '0055', '0056', '0057', '0058', '0059', '005a', '0070', '0071',
            '0072', '0073', '0074', '0080']
        const arr1 = [
            '0010', '0011', '0012', '0013', '0014', '0015', '0016', '0017', '0040',
            '0041', '0042', '0043', '0044', '0048', '0049', '0083']

        const arr2 = [
            '0031', '005b', '005c', '005d', '005e', '0081', '0082', '0101', '0103'
        ]

        for (let i = 0; i < params_list_len; i += 1) {
            const { param_id, param_value } = params_list[i]

            if (arr.includes(param_id)) {
                const data_buf = Buffer.alloc(5)
                const paramid_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                data_buf.writeUIntBE(4, 0, 1)
                data_buf.writeUIntBE(param_value, 1, 4)
                data = Buffer.concat([data, paramid_buf, data_buf])
            }
            else if (arr1.includes(param_id)) {
                const paramid_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                const param_value_len_buf = Buffer.alloc(1)
                const param_value_buf = iconv.encode(param_value, 'gbk')
                param_value_len_buf.writeUIntBE(param_value_buf.length, 0, 1)
                data = Buffer.concat([data, paramid_buf, param_value_len_buf, param_value_buf])

            } else if (arr2.includes(param_id)) {
                const paramid_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                const param_id_buf = Buffer.alloc(3)
                param_id_buf.writeUIntBE(2, 0, 1)
                param_id_buf.writeUIntBE(param_value, 1, 2)
                data = Buffer.concat([data, paramid_buf, param_id_buf])

            } else if (['0084', '0090', '0091', '0092', '0094'].includes(param_id)) {
                const paramid_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                const param_id_buf = Buffer.alloc(2)
                param_id_buf.writeUIntBE(1, 0, 1)
                param_id_buf.writeUIntBE(param_value, 1, 1)
                data = Buffer.concat([data, paramid_buf, param_id_buf])

            } else if (param_id === '0110') {
                const paramid_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                const param_id_buf = Buffer.alloc(9)
                param_id_buf.writeUIntBE(8, 0, 1)
                param_id_buf.writeBigUInt64BE(BigInt(param_value), 1, 7)
                data = Buffer.concat([data, paramid_buf, param_id_buf])
            }
        }
        return data
    }
}

module.exports = JTT808Body8103

