const JTT809body1200 = require('./JTT809Body1200')
const JTT809body9401 = require('./JTT809Body9401')
const JTT809body9402 = require('./JTT809Body9402')
const JTT809body9403 = require('./JTT809Body9403')

const JTT809Body9401 = new JTT809body9401()
const JTT809Body9402 = new JTT809body9402()
class JTT809Body9400 extends JTT809body1200 {
    constructor() {
        super()
        this.DATA_TYPE = {
            '9401': JTT809Body9401,
            '9402': JTT809Body9402,
            '9403': new JTT809body9403(),
        }
    }

    body = {
        '9401': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "9401",
            "data": {
                "warn_src": "01",
                "warn_type": "0001",
                "warn_time": 1574995536,
                "supervision_id": 0,
                "supervision_endtime": 1574999287,
                "supervision_level": "00",
                "supervisor": "王二",
                "supervisor_tel": "15511112222",
                "supervisor_email": "er.wang@dbjtech.com"
            }
        },
        '9402': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "9402",
            "data": {
                "warn_src": "01",
                "warn_type": "0001",
                "warn_time": 1574995536,
                "warn_content": "报警预警"
            }
        },
        '9403': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "9403",
            "data": {
                "warn_src": "01",
                "warn_type": "0001",
                "warn_time": 1574995536,
                "warn_content": "超速报警"
            }
        },
    }
}
module.exports = JTT809Body9400
