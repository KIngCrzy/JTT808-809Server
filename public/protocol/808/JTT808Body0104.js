const iconv = require('iconv-lite')

class JTT808Body0104 {
    body = {
        "flow_number": 3136,
        "params_list": [
            {
                "param_id": "0001",
                "param_value": 10
            },
            {
                "param_id": "0010",
                "param_value": '你好中国'
            },
            {
                "param_id": "0081",
                "param_value": 89
            }
        ]
    }


    decode(data) {
        const flow_number = data.readUIntBE(0, 2)
        const total_params = data.readUIntBE(2, 1)
        const params_list = []
        let index = 3
        const arr = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0018', '0019', '0020',
            '0021', '0022', '0027', '0028', '0029', '002c', '002d', '002e', '002f', '0030',
            '0045', '0046', '0047', '0050', '0051', '0052', '0053', '0054', '0055', '0056',
            '0057', '0058', '0059', '005a', '0070', '0071', '0072', '0073', '0074', '0080']
        const arr1 = ['0010', '0011', '0012', '0013', '0014', '0015', '0016', '0017', '0040', '0041',
            '0042', '0043', '0044', '0048', '0049', '0083']

        for (let i = 0; i < total_params; i += 1) {
            let result = data.toString('hex', index, index + 4)
            const param_id = result.slice(4)
            if (arr.includes(param_id)) {
                const param_value = data.readUIntBE(index + 5, 4)
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 9
            }
            else if (arr1.includes(param_id)) {
                const param_length = data.readUIntBE(index + 4, 1)
                const param_value = iconv.decode(data.slice(index + 5, index + 5 + param_length), 'gbk')
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 5 + param_length
            }
            else if (['0081', '0082'].includes(param_id)) {
                const param_value = data.readUIntBE(index + 5, 2)
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 7
            } else if (param_id === '0084') {
                const param_value = data.readUIntBE(index + 5, 1)
                params_list.push({ 'param_id': param_id, 'param_value': param_value })
                index += 6
            }
        }
        return {
            'flow_number': flow_number,
            'params_list': params_list
        }
    }

    encode(params) {
        const { flow_number, params_list } = params
        const total_params = params_list.length
        const arr = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0018', '0019', '0020',
            '0021', '0022', '0027', '0028', '0029', '002c', '002d', '002e', '002f', '0030',
            '0045', '0046', '0047', '0050', '0051', '0052', '0053', '0054', '0055', '0056',
            '0057', '0058', '0059', '005a', '0070', '0071', '0072', '0073', '0074', '0080']
        const arr1 = ['0010', '0011', '0012', '0013', '0014', '0015', '0016', '0017', '0040', '0041',
            '0042', '0043', '0044', '0048', '0049', '0083']
        let data = Buffer.alloc(3)
        data.writeUIntBE(flow_number, 0, 2)
        data.writeUIntBE(total_params, 2, 1)
        for (let i = 0; i < total_params; i++) {
            const { param_id, param_value } = params_list[i]
            if (arr.includes(param_id)) {
                const result = Buffer.alloc(5)
                const param_id_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])

                result.writeUIntBE(4, 0, 1)
                result.writeUIntBE(param_value, 1, 4)
                data = Buffer.concat([data, param_id_buf, result])
            } else if (arr1.includes(param_id)) {
                const result = Buffer.alloc(1)
                const param_id_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                const value_data = iconv.encode(param_value, 'gbk')
                const length = iconv.encode(param_value, 'gbk').length
                result.writeUIntBE(length, 0, 1)
                data = Buffer.concat([data, param_id_buf, result, value_data])
            } else if (['0081', '0082'].includes(param_id)) {
                const result = Buffer.alloc(3)
                const param_id_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                result.writeUIntBE(2, 0, 1)
                result.writeUIntBE(param_value, 1, 2)
                data = Buffer.concat([data, param_id_buf, result])
            } else if (['0084'].includes(param_id)) {
                const result = Buffer.alloc(2)
                const param_id_buf = Buffer.concat([Buffer.from([0x00, 0x00]), Buffer.from(param_id, 'hex')])
                result.writeUIntBE(1, 0, 1)
                result.writeUIntBE(param_value, 1, 2)
                data = Buffer.concat([data, param_id_buf, result])
            }
        }
        return data
    }
}

module.exports = JTT808Body0104
