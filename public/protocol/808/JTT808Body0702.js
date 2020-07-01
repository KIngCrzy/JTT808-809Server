const iconv = require('iconv-lite')
class JTT808Body0702 {

    body = {
        "status": "01",
        "time": "200116113700",
        "result": "00",
        "driver_name": "张三丰",
        "certificate_id": "川A11234567890",
        "institution_name": "成都交管局",
        "expiry_date": "20211231"
    }

    decode(data) {
        const status = data.slice(0, 1).toString('hex')
        const time = data.slice(1, 7).toString('hex')

        let result
        let driver_name
        let certificate_id
        let institution_name
        let expiry_date
        if (status == '01') {
            result = data.slice(7, 8).toString('hex')
            if (result == '00') {
                const n = data.readUIntBE(8, 1)
                driver_name = iconv.decode(data.slice(9, 9 + n), 'gbk')
                certificate_id = iconv.decode(data.slice(9 + n, 29 + n), 'gbk').replace(/\u0000/g, '')
                const m = data.readUIntBE(29 + n, 1)
                institution_name = iconv.decode(data.slice(30 + n, 30 + n + m), 'gbk')
                expiry_date = data.slice(30 + n + m, 34 + n + m).toString('hex')
            }
        }
        return {
            'status': status,
            'time': time,
            'result': result,
            'driver_name': driver_name,
            'certificate_id': certificate_id,
            'institution_name': institution_name,
            'expiry_date': expiry_date
        }
    }
    encode(params) {
        const { status, time, result, driver_name,
            certificate_id, institution_name, expiry_date } = params

        const status_buf = Buffer.from(status, 'hex')
        const time_buf = Buffer.from(time, 'hex')
        const result_buf = Buffer.from(result, 'hex')

        const data = Buffer.alloc(1)
        const driver_name_buf = iconv.encode(driver_name, 'gbk')
        data.writeUIntBE(driver_name_buf.length, 0, 1)

        const space_buf = Buffer.alloc(driver_name_buf.length)

        let certificate_id_buf = iconv.encode(certificate_id, 'gbk')
        const certificate_buf = Buffer.alloc(20 - certificate_id_buf.length)
        certificate_id_buf = Buffer.concat([certificate_id_buf, certificate_buf])

        const resultdata = Buffer.alloc(1)
        const institution_name_buf = iconv.encode(institution_name, 'gbk')
        resultdata.writeUIntBE(institution_name_buf.length, 0, 1)

        const expiry_date_buf = Buffer.from(expiry_date, 'hex')

        return Buffer.concat([status_buf, time_buf, result_buf, data, driver_name_buf,
            certificate_id_buf, resultdata, institution_name_buf, expiry_date_buf])
    }
}

module.exports = JTT808Body0702
