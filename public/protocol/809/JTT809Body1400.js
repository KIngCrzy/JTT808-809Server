const JTT809body1401 = require('./JTT809Body1401')
const JTT809body1402 = require('./JTT809Body1402')

const JTT809body1200 = require('./JTT809Body1200')

const JTT809Body1401 = new JTT809body1401()
const JTT809Body1402 = new JTT809body1402()
class JTT809Body1400 extends JTT809body1200 {
    constructor() {
        super()
        this.DATA_TYPE = {
            '1401': JTT809Body1401,
            '1402': JTT809Body1402,
        }
    }

    body = {
        '1401': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1401",
            "data": {
                "supervision_id": 0,
                "result": "01"
            }
        },
        '1402': {
            "vehicle_no": "蒙E88888",
            "vehicle_color": 1,
            "data_type": "1402",
            "data": {
                "warn_src": "01",
                "warn_type": "0001",
                "warn_time": 1574995536,
                "info_id": 0,
                "info_content": "超速报警"
            }
        },
    }
}
module.exports = JTT809Body1400
