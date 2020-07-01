const JTT809body1601 = require('./JTT809Body1601')

const JTT809body1200 = require('./JTT809Body1200')

const JTT809Body1601 = new JTT809body1601()
class JTT809Body1600 extends JTT809body1200 {
    constructor() {
        super()
        this.DATA_TYPE = {
            '1601': JTT809Body1601,
        }
    }

    body = {
        '1601': {
            "vehicle_no": "浙A25307",
            "vehicle_color": 1,
            "data_type": "1601",
            "data": {
                "vin": "浙A25307",
                "vehicle_color": 1,
                "vehicle_type": "40",
                "trans_type": "030",
                "vehicle_nationality": "330108",
                "owers_id": "1000",
                "owers_name": "杭州货运代理公司",
                "owers_tel": "13516814499"
            }
        },
    }
}
module.exports = JTT809Body1600
