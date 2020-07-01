const JTT809body9301 = require('./JTT809Body9301')
const JTT809body9302 = require('./JTT809Body9302')
const JTT809body1300 = require('./JTT809Body1300')

const JTT809Body9301 = new JTT809body9301()
const JTT809Body9302 = new JTT809body9302()

class JTT809Body9300 extends JTT809body1300 {
    constructor() {
        super()
        this.DATA_TYPE = {
            '9301': JTT809Body9301,
            '9302': JTT809Body9302,
        }
    }

    body = {
        '9301': {
            "data_type": "9301",
            "data": {
                "info_id": 0,
                "info_content": "平台查岗请求"
            }
        },
        '9302': {
            "data_type": "9302",
            "data": {
                "info_id": 0,
                "info_content": "下发平台间报文请求"
            }
        },
    }

}
module.exports = JTT809Body9300
