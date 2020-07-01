const iconv = require('iconv-lite')
class JTT809Body120a {

    decode(data) {
        return {
            'driver_name': iconv.decode(data.slice(0, 16), 'gbk').replace(/\u0000/g, ''),
            'driver_id': iconv.decode(data.slice(16, 36), 'gbk').replace(/\u0000/g, ''),
            'licence': iconv.decode(data.slice(36, 76), 'gbk').replace(/\u0000/g, ''),
            'org_name': iconv.decode(data.slice(76, 276), 'gbk').replace(/\u0000/g, ''),
        }
    }

    encode(params) {
        console.log(params)
        const { driver_name, driver_id, licence, org_name } = params
        const data = Buffer.alloc(276)
        data.write(iconv.encode(driver_name, 'gbk').toString('hex'), 0, 16, 'hex')

        data.write(iconv.encode(driver_id, 'gbk').toString('hex'), 16, 20, 'hex')

        data.write(iconv.encode(licence, 'gbk').toString('hex'), 36, 40, 'hex')

        data.write(iconv.encode(org_name, 'gbk').toString('hex'), 76, 200, 'hex')

        return data
    }

}
module.exports = JTT809Body120a
